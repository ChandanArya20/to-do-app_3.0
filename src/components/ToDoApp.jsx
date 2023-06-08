import todo from '../images/todo.svg'
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';

//getting data from local storage
const getLocalItems=()=>{
    let items=localStorage.getItem('items');
    if(items)
        return JSON.parse(items)
    else
        return []
}
function TodoApp(){

    //states
    const [inputData,setInputData]=useState('')
    const[items,setItems]=useState(getLocalItems())
    const[placeHolder,setPlaceHolder]=useState('✍️add items...')
    const[toggleState,setToggleState]=useState(true)
    const[editedInputId,setEditedInputId]=useState(null)

    const addItem=()=>{
        if(inputData && toggleState){
            const customisedInputData={id:new Date().getTime().toString(),name:inputData}
            setItems([...items,customisedInputData])
            setInputData('')
        }else if(inputData && !toggleState){
            setItems(
                items.map(elem=>{
                    if(elem.id===editedInputId){
                        return {...elem,name:inputData}
                    }
                    return elem;
                })
            )
            setInputData('')
            setToggleState(true)  
            setEditedInputId(null)
            console.log(items);
        }else
            alert("Plzz fill data")
    }
    const deleteItem=(key)=>{
        const filteredArray=items.filter(items=>items.id!==key)
        setItems(filteredArray)
    }

    const editItem=(key)=>{
        let itemForEdit=items.find(elem=>elem.id===key)
        console.log(itemForEdit.name);
        setInputData(itemForEdit.name)
        setToggleState(false)  
        setEditedInputId(key)    
    }


    //adding data to local storage
    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(items))
    },[items])

    return(
        <>
        <div className="todoApp">
            <div className='heading'>
                <img src={todo} alt='Ram'/>              
                <h3>Add You List Here✌️</h3>
            </div>
            <div className='inputContainer'>
                <input type='text' placeholder={placeHolder} value={inputData}
                    onChange={event=>setInputData(event.target.value)}
                    onClick={()=>setPlaceHolder('')}
                    onBlur={()=>setPlaceHolder('✍️add items...')}/>
                <div className='inputIcon-container'>
                {
                    toggleState?<FaPlus className='inputIcon' onClick={addItem}/>:
                    <FaEdit className='inputIcon' onClick={addItem}/>
                    
                }
                </div>                    
            </div>
            <div className='item-container'>
            {
                items.map((elem)=>(
                    <div className='item' key={elem.id}>
                        <h4>{elem.name}</h4>
                        <FaEdit className='edit-icon' onClick={()=>editItem(elem.id)}/>                    
                        <RiDeleteBin6Line className='delete-icon' onClick={()=>deleteItem(elem.id)}/>                    
                    </div>
                ))
            }
           </div>
            {
                items.length > 1 ? (
                    <div className='deleteAllBtn'>
                        <button className='' onClick={()=>setItems([])}>Delete All</button>
                    </div>  
                ) : null                                                    
            }
        </div>
        </>
    )
}

export default TodoApp