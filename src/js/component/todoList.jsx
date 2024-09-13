import React, { useState, useEffect} from "react";

const TodoList = () => {
   
    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect (()=> {
        console.log('se inicio')
        getTodoList()
    },[])

    const getTodoList = () =>{
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("https://playground.4geeks.com/todo/users/todoList", requestOptions)
            .then((response) => response.text())
            .then(data => {
                setNotes(JSON.parse(data).todos);
            });
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "label": inputValue,
                    "is_done": false
                  })
            };
            fetch('https://playground.4geeks.com/todo/todos/todoList', requestOptions)
                .then(response => response.json())
                .then((data)=> {
                    console.log(data)
                    setNotes([data, ...notes]);
                    setInputValue(""); 
                });
        }
    };

    const handleDelete = (index) => {
        
        
        console.log("deleteTask", index)
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          fetch(`https://playground.4geeks.com/todo/todos/${index}`, requestOptions)
            .then((response) => response.text())
            .then(() => {
                const deletedResult = notes.filter(i => i.id !== index);
                setNotes(deletedResult);
            })
            .catch((error) => console.error(error));
    };

    const allDelete = (index) => {
        
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          fetch(`https://playground.4geeks.com/todo/todos/${index}`, requestOptions)
            .then((response) => response.text())
            .then(() => {setNotes(notes.filter((_, i) => i == index)); })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <div className="position-absolute top-50 start-50 translate-middle" style={{width: '50rem', backgroundColor: "pink", height: '25rem'}}>
                <h1 className="d-flex justify-content-center  " style={{ fontSize: '100px' }}>Todo</h1>
                <div className="position-absolute top-30 start-50 translate-middle" >
                    <input value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} type="text" placeholder="What needs to be done?"/>
                    {notes?.map((note, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: '0', flexGrow: 1 }}>{note.label}</p>
                            <button onClick={() => handleDelete(note.id)} style={{ marginLeft: '8px' }}>X</button>
                        </div>
                        
                    ))}
                   

                </div>
                <button className="position-absolute top-100 start-50 translate-middle" onClick={allDelete}>Borrar todas las Tareas</button>
               

            </div>
            
        </>
    );
};

export default TodoList;