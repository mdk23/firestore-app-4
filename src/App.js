import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from "./components/Todo";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";

import { db } from "./firebase";

 const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-2xl p-6`,
  heading:`text-3xl font-bold text-center text-gray-800 p-2`,
  form:`flex justify-between`,
  input:`border p-2 w-full text-xl`,
  button:`border p-4 ml-2 bg-purple-500 text-slate-100`,
  count:`text-center p-4`
} 

function App() {
  const [todos,setTodos]=useState([])
  const [input,setInput]=useState('');

  //Read Todo
  useEffect(()=>{
    const q=query(collection(db,'todos'));
    const unsubscribe=onSnapshot(q, (querySnapshot)=>{
      let todosArray=[] 
      querySnapshot.forEach((doc)=>{
        todosArray.push({...doc.data(),id: doc.id})
      });
      setTodos(todosArray)
    })
    return ()=>unsubscribe();
  },[])
  
  
  const create_Todo=async (e)=>{
    e.preventDefault();
    if(input===''){
      alert('Please enter a valid todo');
      return
    }
    await addDoc(collection(db,'todos'),{
      text:input,
      completed:false,
    })

    setInput('');
  }
  
  //Toggle Complete
  const toggleComplete=async (todo)=>{
    await updateDoc( doc(db,'todos',todo.id),{
      completed:!todo.completed
    })
  }

  const deleteTodo= async (id)=>{
    await deleteDoc( doc(db,'todos',id));
  }
  
  return (
    <div className={style.bg}>
      <div className={`${style.container} mt-6`}>
          <h3 className={style.heading}>Todo App </h3>
          <form onSubmit={(e)=>create_Todo(e)} className={style.form}>
              <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type='text' placeholder='Add a Todo'/>
              <button  className={style.button}> <AiOutlinePlus size={30}/>  </button>
          </form>

        <ul>
            {
              todos.map( (todo,i)=>(
                <Todo key={i} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/> 
              ))
            }
           
        </ul>
         <p className={style.count}>You have {todos.length} todos </p>   
      </div>
       
    </div>
  );
}

export default App;
