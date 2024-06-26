// import { useState, useRef  } from "react"
// import '../ToDoList.css'; 

// function ToDoList() {

//     const [job, setJob] = useState('')
//     const [jobs, setJobs] = useState(() => {
//         const storageJobs = JSON.parse(localStorage.getItem('job'));

//         return storageJobs;
//     }) //dsach => mảng


//     const inputEl = useRef(null);
//     const hangleSubmit = () => {
//         setJobs(prev => {
//             const newJobs = [...prev, job];

//             //save to local storage
//             const jsonJobs = JSON.stringify(newJobs)
//             localStorage.setItem('job', jsonJobs)

//             console.log(job)
//             return newJobs;
//         });
//         setJob('')
//         inputEl.current.focus();// 'current' trỏ tới giá trị của ref
//     } 


//     return (
//         <div>
//             <input 
//                 ref={inputEl}
//                 value={job}
//                 onChange={e => setJob(e.target.value)}
//             />
//             <button onClick={hangleSubmit}>Add</button>

//             <ul>
//                 {jobs.map((job, index) => (
//                     <li key={index}>{job}
                        
//                     </li>
//                 ))}
//             </ul>

//         </div>
//     )
// }

// export default ToDoList

import React, { useState, useRef, useEffect } from 'react';
import '../ToDoList.css'; // Import CSS file

function ToDoList() {
  const [job, setJob] = useState(''); // State lưu trữ công việc mới
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs')) || []; // State lưu trữ danh sách công việc
    return storageJobs;
  });
  const [isEditing, setIsEditing] = useState(false); // State quản lý chế độ chỉnh sửa
  const [currentJobIndex, setCurrentJobIndex] = useState(null); // State lưu chỉ số của công việc đang chỉnh sửa
  const [editedJob, setEditedJob] = useState(''); // State lưu giá trị công việc đang chỉnh sửa

  const inputEl = useRef(null); // Ref để tham chiếu đến input

  const handleSubmit = () => {
    if (job.trim() === '') return; // Kiểm tra nếu job rỗng thì không làm gì cả
  
    setJobs(prev => {
      const newJobs = [...prev, job]; // Thêm job mới vào danh sách công việc
      localStorage.setItem('jobs', JSON.stringify(newJobs)); // Lưu danh sách công việc vào localStorage
      return newJobs; // Trả về danh sách công việc mới
    });
    setJob(''); // Reset giá trị job về rỗng
    inputEl.current.focus(); // Focus vào input để người dùng có thể nhập công việc tiếp theo
  };
  

  const handleDelete = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this job?'); // Hiển thị hộp thoại xác nhận xóa công việc
  
    if (isConfirmed) {
      setJobs(prev => {
        const newJobs = prev.filter((_, i) => i !== index); // Loại bỏ công việc với chỉ số index khỏi danh sách
        localStorage.setItem('jobs', JSON.stringify(newJobs)); // Cập nhật lại localStorage
        return newJobs; // Trả về danh sách công việc mới sau khi xóa
      });
    }
  };
  

  const handleEdit = (index) => {
    setIsEditing(true); // Đặt chế độ chỉnh sửa là true
    setCurrentJobIndex(index); // Lưu chỉ số của công việc đang chỉnh sửa
    setEditedJob(jobs[index]); // Lưu giá trị của công việc đang chỉnh sửa vào state
  };
  

  const handleSave = () => {
    setJobs(prev => {
      const newJobs = [...prev]; // Sao chép danh sách công việc hiện tại
      newJobs[currentJobIndex] = editedJob; // Cập nhật công việc tại chỉ số currentJobIndex bằng editedJob
      localStorage.setItem('jobs', JSON.stringify(newJobs)); // Lưu danh sách công việc vào localStorage
      return newJobs; // Trả về danh sách công việc mới sau khi cập nhật
    });
    setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    setCurrentJobIndex(null); // Reset chỉ số công việc đang chỉnh sửa
    setEditedJob(''); // Reset giá trị công việc đang chỉnh sửa
  };
  

  const handleCancel = () => {
    setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    setCurrentJobIndex(null); // Reset chỉ số công việc đang chỉnh sửa
    setEditedJob(''); // Reset giá trị công việc đang chỉnh sửa
  };
  

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          ref={inputEl}
          value={job}
          onChange={e => setJob(e.target.value)}
          placeholder="Enter a job"
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job}
            <div>
              <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Điều kiện hiển thị Modal, Hộp thoại này chỉ được hiển thị khi người dùng nhấn vào nút "Edit" của một công việc nào đó */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Job</h2>
            <input
              value={editedJob}
              onChange={e => setEditedJob(e.target.value)}
              placeholder="Edit job"
            />
            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDoList;
