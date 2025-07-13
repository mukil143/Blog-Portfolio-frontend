import React, { useState } from "react";

const HireMeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
      setStatus("Sending...");
      const res = await fetch("https://blog-portfolio-backend.onrender.com/send-hire-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) setStatus("Message sent successfully!");
      else setStatus("Failed to send. Try again.");
    
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-4">
  <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
    >
      ×
    </button>

    <h2 className="text-2xl font-semibold text-center mb-4">Hire Me</h2>

    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="text"
        required
        placeholder="Your Name"
        className="w-full border p-2 rounded-sm"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        required
        placeholder="Your Email"
        className="w-full border p-2 rounded-sm"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        required
        placeholder="Your Message"
        className="w-full border p-2 rounded-sm"
        rows="4"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-sm hover:bg-orange-600 transition"
      >
        Send Message
      </button>
    </form>

    {status && (
      <p className="text-sm text-center mt-3 text-green-600">{status}</p>
    )}
  </div>
</div>
  ) : null;
};

export default HireMeModal;
