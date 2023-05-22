import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
// const [visible, setVisible] = useState(false); // 

  const address = props.address;
  const setAddress = props.setAddress;

  const onCompletePost = (data) => {
    // console.log(data.address);
    setAddress(data.address);
  };

  const postCodeStyle = {
   
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100, 
  };

  return (
    <>
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}

        />
     
    </>
  );
};

export default Post;
// import React from 'react';
// import { useDaumPostcodePopup } from 'react-daum-postcode';

// const DaumPost = () => {
//   const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

//   const handleComplete = (data) => {
//     let fullAddress = data.address;
//     let extraAddress = '';

//     if (data.addressType === 'R') {
//       if (data.bname !== '') {
//         extraAddress += data.bname;
//       }
//       if (data.buildingName !== '') {
//         extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
//       }
//       fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
//     }

//     console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
//   };

//   const handleClick = () => {
//     open({ onComplete: handleComplete });
//   };

//   return (
//     <button type='button' onClick={handleClick}>
//       우편번호 검색
//     </button>
//   );
// };
// import REACT, { useState } from 'react';
// import DaumPostCode from 'react-daum-postcode';

// const DaumPost = () => {
//     const handleComplete = (data) => {
//         let fullAddress = data.address;
//         let extraAddress = '';
        
//         const {addressType, bname, buildingName} = data
//         if (addressType === 'R') {
//             if (bname !== '') {
//                 extraAddress += bname;
//             }
//             if (buildingName !== '') {
//                 extraAddress += `${extraAddress !== '' && ', '}${buildingName}`;
//             }
//             fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`;
//         }
//         console.log(fullAddress);
//         //fullAddress -> 전체 주소반환
//     }
//     return (<DaumPostCode onComplete={handleComplete} className="post-code" />);
// }
// export default DaumPost;