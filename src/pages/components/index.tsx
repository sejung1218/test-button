import styled from "@emotion/styled";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function  Button() {

    const [posts, setPosts] = useState([])



        useEffect(()=>{
            // axios({
            //     method : 'GET',
            //     url : 'https://jsonplaceholder.typicode.com/photos'
            // }).then(response => setPosts(response.data))

                axios.get('https://192.168.50.67:8080/emon/score?page=1')
                    .then(response => setPosts(response.data))
            // function ApiButton(){
            // }
            // console.log(ApiButton())

        })

        // useEffect(async()=> {
        //     try {
        //         const response = await axios.get('https://jsonplaceholder.typicode.com/photos')
        //         setPosts(response.data)
        //     }catch (error){
        //         console.log(error)
        //     }
        // })


    return (
            <YujinInner>
                <YujinButton01>버튼 입니당</YujinButton01>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <div>{post.title}</div>
                            <div><img src={post.thumbnailUrl}/></div>
                        </li>
                    ))}
                </ul>
                <YujinButton02>확인</YujinButton02>
                <YujinButton03>버~튼</YujinButton03>
                <YujinButton04>또버튼</YujinButton04>
            </YujinInner>
    )
}
const PostsBox = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: bisque;
  color: #222;
`
const YujinInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: #fff;
  color: #222;
`
const YujinButton01 = styled.button`
  width: 300px;
  height: 40px;
  border: 1px solid #ddd;
  background: #efefef;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: #222;
`
const YujinButton02 = styled.button `
  width: 50px;
  height: 30px;
  border: none;
  background: #4844FF;
  color: #fff;
  border-radius: 4px;
  transition: .3s;
  cursor: pointer;
  
  &:hover {
    background: #3733E9;
  }
  &:active {
    background: #2B28CA;
  }
`
const YujinButton03 = styled.button `
  width: 200px;
  height: 50px;
  background: #fff;
  color: #ED4D4D;
  border: none;
  position: relative;
  
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #ED4D4D;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .3s;
  }
  &:hover::before {
    width: 100%;
  }
`
const YujinButton04 = styled.button`
  width: 200px;
  height: 40px;
  background: #95cc95;
  color: #fff;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #78c078;
  }
`