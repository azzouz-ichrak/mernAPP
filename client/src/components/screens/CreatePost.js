import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

// https://api.cloudinary.com/v1_1/dyug1pvey/image/upload



const CreatePost = ()=>{
    const history = useHistory("")
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url) {
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
    .then(data=>{
       // console.log(data)
        if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:"created post success",classes:"#388e3c green darken-2"})
            history.push('/')

        }
    }).catch(err=>{
        console.log(err)
    })
}
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","dyug1pvey")
        //j8KvBG9tUBv26fSm5c6p2b1zPBY
      //  CLOUDINARY_URL=cloudinary://478786371484157:j8KvBG9tUBv26fSm5c6p2b1zPBY@dyug1pvey
        fetch("https://api.cloudinary.com/v1_1/dyug1pvey/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
 
    }

    return(
        <div className="card input-filed"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
             />
            <input type="text" 
            placeholder="body" 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload image</span>
                    <input type="file" 
                    
                    onChange={(e)=>setImage(e.target.files[0])} 
                     />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate"
                    type="text" />
                </div>
                </div>
                
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
                >Submit post </button>


                </div>
    )
}

export default CreatePost 