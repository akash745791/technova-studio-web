// scripts/verify-technova.mjs
const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=================================================");
  console.log("TECHNOVA STUDIO — AUTOMATED ACCEPTANCE TEST SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`FAIL: ${name}`);
      console.error(`      -> ${err.message}`);
      failed++;
    }
  }

  // 1. PUBLIC ROUTES VERIFICATION
  const routes = [
    "/",
    "/about",
    "/services",
    "/services/website-development",
    "/services/frontend-development",
    "/services/backend-apis",
    "/services/ai-solutions",
    "/services/cybersecurity-development",
    "/services/maintenance-bug-fixing",
    "/portfolio",
    "/portfolio/apex-commerce-demo",
    "/portfolio/nexus-ai-demo",
    "/portfolio/fortress-security-demo",
    "/contact",
    "/get-a-quote",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
    "/robots.txt",
    "/sitemap.xml",
    "/admin/login",
  ];

  for (const route of routes) {
    await test(`GET ${route} returns HTTP 200`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      if (res.status !== 200) {
        throw new Error(`Expected 200 OK, got ${res.status}`);
      }
    });
  }

  // 2. CONTACT ACTIONS & BRAND DETAILS VERIFICATION
  await test("Brand details, WhatsApp & phone links rendered in HTML", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const html = await res.text();
    if (!html.includes("92141 33787") && !html.includes("9214133787")) {
      throw new Error("Primary phone/WhatsApp not found in homepage HTML");
    }
    if (!html.includes("63755 47551") && !html.includes("6375547551")) {
      throw new Error("Secondary phone/WhatsApp not found in homepage HTML");
    }
    if (!html.includes("technovastudio.in@gmail.com")) {
      throw new Error("Official email not found in homepage HTML");
    }
  });

  // 3. ENQUIRY VALIDATION: INVALID SUBMISSION REJECTION
  await test("Reject enquiry with missing privacy consent", async () => {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "Test Client",
        email: "test@example.com",
        service_slug: "website-development",
        project_title: "Test Project",
        project_description: "This is a detailed description of the project requirements.",
        preferred_contact_method: "whatsapp",
        privacy_consent: false, // Invalid!
      }),
    });
    if (res.status !== 400) {
      throw new Error(`Expected HTTP 400 for missing consent, got ${res.status}`);
    }
  });

  // 4. ENQUIRY VALIDATION: BOT HONEYPOT TRAP
  await test("Reject bot submission with honeypot triggered", async () => {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "Spam Bot",
        email: "bot@spam.com",
        service_slug: "website-development",
        project_title: "Cheap Meds Promo",
        project_description: "Spam text here for testing honeypot.",
        preferred_contact_method: "email",
        privacy_consent: true,
        honeypot: "malicious_bot_content", // Honeypot filled!
      }),
    });
    if (res.status !== 400) {
      throw new Error(`Expected HTTP 400 for honeypot, got ${res.status}`);
    }
  });

  // 5. VALID ENQUIRY SUBMISSION & PERSISTENCE
  let generatedRefId = "";
  await test("Save valid enquiry and generate Reference ID (TNS-2026-XXXXX)", async () => {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "Aakash Verma",
        email: "aakash.test@example.com",
        phone: "+91 98765 43210",
        business_name: "Verma Enterprises",
        service_slug: "website-development",
        project_title: "Modern E-Commerce Portal",
        project_description: "We require a complete Next.js website with high-performance product browsing and mobile responsiveness.",
        budget_range: "₹60,000 – ₹1,50,000 / $750 – $1,800",
        timeline: "Standard (3-4 weeks)",
        preferred_contact_method: "whatsapp",
        privacy_consent: true,
        honeypot: "",
      }),
    });

    if (res.status !== 200) {
      const errText = await res.text();
      throw new Error(`Expected HTTP 200, got ${res.status}: ${errText}`);
    }

    const data = await res.json();
    if (!data.success || !data.reference_id) {
      throw new Error("Missing success or reference_id in response");
    }

    if (!data.reference_id.startsWith("TNS-")) {
      throw new Error(`Reference ID format unexpected: ${data.reference_id}`);
    }

    generatedRefId = data.reference_id;
    console.log(`      -> Created enquiry with Reference ID: ${generatedRefId}`);
  });

  // 6. ADMIN SECURITY: UNAUTHORIZED ACCESS REJECTION
  await test("Reject unauthorized access to admin enquiries endpoint (HTTP 401)", async () => {
    const res = await fetch(`${BASE_URL}/api/enquiries`, { method: "GET" });
    if (res.status !== 401) {
      throw new Error(`Expected HTTP 401, got ${res.status}`);
    }
  });

  // 7. ADMIN AUTHENTICATION: REJECT BAD PASSWORD
  await test("Reject admin login with invalid password (HTTP 401)", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "technovastudio9",
        password: "WrongPassword123!",
      }),
    });
    if (res.status !== 401) {
      throw new Error(`Expected HTTP 401, got ${res.status}`);
    }
  });

  // 8. ADMIN AUTHENTICATION: VALID LOGIN & SESSION COOKIE
  let authCookie = "";
  await test("Authenticate admin (technovastudio9) and receive secure session cookie", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "technovastudio9",
        password: "TechnovaStudio009",
      }),
    });

    if (res.status !== 200) {
      throw new Error(`Login failed with HTTP ${res.status}`);
    }

    const cookieHeader = res.headers.get("set-cookie");
    if (!cookieHeader || !cookieHeader.includes("technova_admin_token")) {
      throw new Error("Missing technova_admin_token in Set-Cookie header");
    }

    // Extract cookie value for subsequent authenticated calls
    authCookie = cookieHeader.split(";")[0];
    console.log(`      -> Authenticated successfully as technovastudio9. Session token established.`);
  });

  // 9. ADMIN READ: VERIFY ENQUIRY PERSISTED IN DATABASE
  let persistedEnquiryId = "";
  await test("Admin reads real enquiries from database and locates submitted enquiry", async () => {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      headers: { Cookie: authCookie },
    });

    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }

    const data = await res.json();
    const found = data.data.find((e) => e.reference_id === generatedRefId);
    if (!found) {
      throw new Error(`Enquiry ${generatedRefId} not found in database!`);
    }

    persistedEnquiryId = found.id;
    console.log(`      -> Found persisted enquiry ID: ${persistedEnquiryId}`);
  });

  // 10. ADMIN UPDATE: UPDATE ENQUIRY STATUS & PRIVATE NOTES
  await test("Admin updates enquiry status to 'contacted' with internal notes", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/enquiries/${persistedEnquiryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        status: "contacted",
        internal_notes: "Followed up on WhatsApp. Shared preliminary architecture overview.",
      }),
    });

    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }

    const data = await res.json();
    if (data.data.status !== "contacted" || !data.data.internal_notes.includes("Followed up")) {
      throw new Error("Status or internal notes were not updated correctly");
    }
  });

  // 11. ADMIN CONTENT CRUD: SERVICES & PROJECTS
  await test("Admin can read and update site settings", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        tagline: "Your Ideas. Our Technology. Real Digital Experiences.",
      }),
    });

    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }
  });

  // 12. TEAM & WORK ALLOCATION (KON SA EMPLOYEE KYA KAR RAHA HAI)
  await test("Admin can list employees and verify active workforce assignments", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/employees`, {
      headers: { Cookie: authCookie },
    });

    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }

    const json = await res.json();
    if (!Array.isArray(json.data) || json.data.length === 0) {
      throw new Error("Employees list is empty or invalid format");
    }
  });

  await test("Admin can create a work task and assign to an employee", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        title: "Test Task Verification",
        description: "Checking task assignment to employee in admin",
        employee_id: "emp-1",
        employee_name: "Akash Rai",
        client_or_project: "Test Verification Suite",
        priority: "medium",
        status: "in_progress",
      }),
    });

    if (res.status !== 200) {
      throw new Error(`Expected HTTP 200, got ${res.status}`);
    }

    const json = await res.json();
    if (!json.success || !json.data.id) {
      throw new Error("Task was not created successfully");
    }

    // Clean up created test task
    await fetch(`${BASE_URL}/api/admin/tasks/${json.data.id}`, {
      method: "DELETE",
      headers: { Cookie: authCookie },
    });
  });

  console.log("\n=================================================");
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
