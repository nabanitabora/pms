// // DateRangePicker.js
// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { ReactComponent as CalendarIcon } from '../../../../public/calendar.svg';
// import { format } from 'date-fns';

// const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
//   // Custom input component for DatePicker
//   const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
//     const formattedDate = value ? format(new Date(value), 'd MMMM, yyyy') : '';

//     return (
//       <div className="relative">
//         <input
//           className="px-4 py-2 border rounded w-full pr-10"
//           onClick={onClick}
//           value={formattedDate}
//           readOnly
//           ref={ref}
//           style={{
//             width: '134px',
//             height: '37px',
//             color: '#6D6D6D',
//             fontFamily: 'DM Sans',
//             fontSize: '12px',
//             fontStyle: 'normal',
//             fontWeight: 500,
//             lineHeight: '24px',
//             letterSpacing: '-0.24px'
//           }}
//         />
//         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//           <CalendarIcon className="w-5 h-5 text-gray-600" />
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="flex items-center space-x-4 p-4">
//       <div className="flex flex-col items-start">
//         <span className="text-gray-600" style={{ textAlign: 'left', marginBottom: '5px' }}>From</span>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           customInput={<CustomInput />}
//           popperPlacement="bottom-start"
//           className="px-4 py-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col items-start">
//         <span className="text-gray-600" style={{ textAlign: 'left', marginBottom: '5px' }}>To</span>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           customInput={<CustomInput />}
//           popperPlacement="bottom-start"
//           className="px-4 py-2 border rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default DateRangePicker;
