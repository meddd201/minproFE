// import React, { useState } from 'react';

// const Step3WithEventID = () => {
//   const [voucherDetails, setVoucherDetails] = useState({ code: '', discount: '', expiry: '' });

//   const handleSubmit = () => {
//     // Save vouchers associated with eventId
//     console.log('Vouchers created:', voucherDetails);
//   };

//   return (
//     <div>
//       <h1>Create Vouchers</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Voucher Code"
//           value={voucherDetails.code}
//           onChange={(e) => setVoucherDetails({ ...voucherDetails, code: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Discount (%)"
//           value={voucherDetails.discount}
//           onChange={(e) => setVoucherDetails({ ...voucherDetails, discount: e.target.value })}
//         />
//         <input
//           type="date"
//           placeholder="Expiry Date"
//           value={voucherDetails.expiry}
//           onChange={(e) => setVoucherDetails({ ...voucherDetails, expiry: e.target.value })}
//         />
//         <button type="submit">Create Vouchers</button>
//       </form>
//     </div>
//   );
// };

// export default Step3WithEventID;