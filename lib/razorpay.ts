export const loadRazorpay = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true) // already loaded
        return
      }
      const script = document.createElement("script")
      script.id = "razorpay-script"
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  