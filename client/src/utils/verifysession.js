const verifysession = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Verifying session with token:", token ? "exists" : "missing");
    
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("student");
      localStorage.removeItem("admin");
      localStorage.removeItem("hostel");
      return;
    }

    let response = await fetch("http://localhost:3000/api/auth/verifysession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: token})
    });

    let result = await response.json();
    console.log("Session verification result:", result);
    
    if (result.success) {
      if (result.data.isAdmin) {
        console.log("Redirecting to admin dashboard");
        window.location.href = "/admin-dashboard";
      } else {
        console.log("Redirecting to student dashboard");
        window.location.href = "/student-dashboard";
      }
    }
    else {
      console.log("Session verification failed, clearing storage");
      localStorage.removeItem("token");
      localStorage.removeItem("student");
      localStorage.removeItem("admin");
      localStorage.removeItem("hostel");
    }
  } catch (error) {
    console.error("Session verification error:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    localStorage.removeItem("admin");
    localStorage.removeItem("hostel");
  }
};

  export default verifysession;