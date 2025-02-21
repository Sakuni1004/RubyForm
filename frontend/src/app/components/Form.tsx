'use client';

import React, { useState,useEffect } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    file: null as File | null,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents hydration mismatches

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('user[first_name]', formData.first_name);
    formDataObj.append('user[last_name]', formData.last_name);
    formDataObj.append('user[email]', formData.email);
    formDataObj.append('user[dob]', formData.dob);

    if (formData.file) {
      formDataObj.append('user[file]', formData.file);
    }

    try {
      const res = await fetch('http://localhost:3001/api/v1/submit_form', {
        method: 'POST',
        body: formDataObj,
      });

      if (res.ok) {
        alert('Form submitted successfully!');
      } else {
        const errorData = await res.json();
        alert(`Failed to submit form: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div suppressHydrationWarning className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="p-6 w-full max-w-md bg-gray-200 rounded">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-4 font-poppins">Submit Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-sm text-gray-700">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border p-2 mt-1 w-full text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm text-gray-700">Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border p-2 mt-1 w-full text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 mt-1 w-full text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm text-gray-700">Date of Birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border p-2 mt-1 w-full text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm text-gray-700">Upload PDF</label>
            <input
              id="file"
              type="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="border p-2 mt-1 w-full text-black"
              required
            />
          </div>

          <div>
            <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
