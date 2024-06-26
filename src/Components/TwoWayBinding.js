import { useState } from "react"

const courses = [
    {
      id: 1,
      name: 'The Edge DL',
      price: 54950
    },
    {
      id: 2,
      name: 'R.O.G Machine Action',
      price: 45000
    },
    {
      id: 3,
      name: '8Pack OrionX ',
      price: 42900
    }
  ]

function TwoWayBinding() { 

    const [checked, setChecked] = useState([])


    const handleCheck = (id) => {
        setChecked(prev => {

            const isChecked = checked.includes(id)
            if(isChecked) {
                return checked.filter(item => item !== id)// lọc bỏ các thằng đang chọn
            } else {
               return [...prev, id]//bảo lưu cái cũ và truyền mảng mới 
            }
        })
    }

    const handleSubmit = () => {
        console.log({ids : checked});
    }

    return (
        <>
            {courses.map(course => (
                <div key={course.id}>
                    <input 
                        type="checkbox" 
                        checked={checked.includes(course.id)}
                        onChange={() => handleCheck(course.id)}//mỗi khi check phải lấy đc id để them vào [ useStae[] ]
                    />
                    {course.name}
                </div>
            ))}

            <button onClick={handleSubmit}>
                Register
            </button>
        </>
    )
}

export default TwoWayBinding


/* radio
//lấy id
    const [checked, setChecked] = useState(2)


    const handleSubmit = () => {


    }


    return (
        <>
            {courses.map(course => (
                <div key={course.id}>
                    <input
                        type="radio"
                        checked={checked === course.id}
                        onChange={() => setChecked(course.id)}
                    />
                    {course.name}
                </div>
            ))}


            <button onClick={handleSubmit}>
                Register
            </button>
        </>
    )

*/