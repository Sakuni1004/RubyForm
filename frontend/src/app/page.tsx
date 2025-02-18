// // pages/page.tsx (or the correct path where your page is located)
// 'use client';
// import { useState } from "react";

// export default function Form() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dob: "",
//     file: null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();


//      console.log("Form data being submitted:", formData);
//     // Create FormData object to handle file uploads
//     const formDataObj = new FormData();
//     formDataObj.append("first_name", formData.firstName);
//     formDataObj.append("last_name", formData.lastName);
//     formDataObj.append("email", formData.email);
//     formDataObj.append("dob", formData.dob);

//     // Check if a file is selected before appending
//     if (formData.file) {
//       formDataObj.append("file", formData.file);
//     }

//     try {
//       const res = await fetch("http://localhost:3001/api/v1/submit_form", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           email: formData.email,
//           dob: formData.dob,
//         }),
//       });

//       if (res.ok) {
//         alert("Form submitted successfully!");
//       } else {
//         alert("Failed to submit form!");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="text-2xl font-semibold">Submit Your Information</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}  
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block">File Upload (PDF or PNG)</label>
//           <input
//             type="file"
//             name="file"
//             accept=".pdf,.png"
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';
import React, { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    file: null,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('user[first_name]', formData.firstName);
    formDataObj.append('user[last_name]', formData.lastName);
    formDataObj.append('user[email]', formData.email);
    formDataObj.append('user[dob]', formData.dob);

    if (formData.file) {
      formDataObj.append('file', formData.file);
    }

    try {
      const res = await fetch('http://localhost:3001/api/v1/submit_form', {
        method: 'POST',
        body: formDataObj,
      });

      if (res.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit form!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Submit Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="firstName" className="block text-sm">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 mt-1 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 mt-1 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 mt-1 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm">Date of Birth</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 mt-1 w-full"
            required
          />
        </div>

 

        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
