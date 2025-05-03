// "use client";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter, useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const validationSchema = Yup.object({
//   name: Yup.string().min(5, "Name must be at least 5 characters").required("Name is required"),
//   description: Yup.string().min(20, "Description must be at least 20 characters").required("Description is required"),
//   category: Yup.string().required("Category is required"),
//   location: Yup.string().required("Location is required"),
// });

// export default function EditEventPage() {
//   const router = useRouter();
//   const { eventid } = useParams();
//   const [initialValues, setInitialValues] = useState(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await fetch(`/api/events/${eventid}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch event data");
//         }
//         const data = await response.json();
//         setInitialValues(data);
//       } catch (error) {
//         console.error(error);
//         alert("An error occurred while fetching event data");
//       }
//     };

//     fetchEvent();
//   }, [eventid]);

//   const onSubmit = async (values) => {
//     try {
//       const response = await fetch(`/api/events/${eventid}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update event");
//       }

//       alert("Event updated successfully!");
//       router.push(`/organization/create-event/step2/${eventid}`);
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while updating the event");
//     }
//   };

//   if (!initialValues) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto py-12 px-4">
//       <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         <Form className="space-y-6">
//           {/* Event Name */}
//           <div>
//             <label className="block font-medium mb-1">Event Name</label>
//             <Field
//               name="name"
//               as={Input}
//               className="w-full"
//             />
//             <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           {/* Event Description */}
//           <div>
//             <label className="block font-medium mb-1">Event Description</label>
//             <Field
//               name="description"
//               as={Textarea}
//               className="w-full"
//             />
//             <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           {/* Event Category */}
//           <div>
//             <label className="block font-medium mb-1">Category</label>
//             <Field
//               name="category"
//               as="select"
//               className="w-full border rounded-md p-2"
//             >
//               <option value="technology" label="Technology" />
//               <option value="music" label="Music" />
//               <option value="business" label="Business" />
//               <option value="arts" label="Arts" />
//             </Field>
//             <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           {/* Event Location */}
//           <div>
//             <label className="block font-medium mb-1">Location</label>
//             <Field
//               name="location"
//               as={Input}
//               className="w-full"
//             />
//             <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

//           {/* Submit Button */}
//           <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
//             Update Event
//           </Button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }


// // WITHID
