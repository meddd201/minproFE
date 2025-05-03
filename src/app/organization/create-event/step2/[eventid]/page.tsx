// import React, { useState } from 'react';

// const Step2WithEventID = () => {
//   const [ticketDetails, setTicketDetails] = useState({ type: '', price: '', quantity: '' });

//   const handleSubmit = () => {
//     // Save tickets associated with eventId
//     console.log('Tickets created:', ticketDetails);
//   };

//   return (
//     <div>
//       <h1>Create Tickets</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Ticket Type"
//           value={ticketDetails.type}
//           onChange={(e) => setTicketDetails({ ...ticketDetails, type: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={ticketDetails.price}
//           onChange={(e) => setTicketDetails({ ...ticketDetails, price: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={ticketDetails.quantity}
//           onChange={(e) => setTicketDetails({ ...ticketDetails, quantity: e.target.value })}
//         />
//         <button type="submit">Create Tickets</button>
//       </form>
//     </div>
//   );
// };

// export default Step2WithEventID;