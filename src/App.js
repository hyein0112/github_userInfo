/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useState, useEffect } from "react"; 

function App() {
  const [user, setUser] = useState("");
  const [info, setInfo] = useState({})
  const [infoDisplay, setDisplay] = useState('none');
  const onChange = (event) => setUser(event.target.value);
  const onSubmit = (event) => { 
    event.preventDefault();
    if(user === "") {
        return;
    }
    console.log(user)
    const userName = user;
    const url = `https://api.github.com/users/${userName}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setInfo({
          avatar: data.avatar_url,
          name: data.name,
          bio: data.bio,
          followers: data.followers,
          following: data.following,
          repos: data.public_repos,
          url: data.html_url
        })
        console.log(data)
      })
      setUser("")
      setDisplay('')
  }

  useEffect(()=>{
    console.log(info)
  }, [info]) 

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.3rem;
    `}>
      <h1 css={css`
        text-align: center;
        font-size: 4rem;
        margin-bottom: 20px;
      `
      }>Github</h1>
      <>
        <form css={css`
          width: 800px;
          margin-bottom: 10%;
          text-align: center;

          @media ( max-width: 768px ) {
          width: 90%;
}
        `}
        onSubmit={onSubmit}
        >
          <input css={css`
            width: 70%;
            border: 3px solid #e0e0e0;
            padding: 10px 30px;
            border-radius: 50px;
            font-size: 1.3rem;
          `}
          placeholder="user name" 
          type='text' 
          value={user} 
          onChange={onChange} 
          />
        </form>
        <div css={css`display: ${infoDisplay};`} className="userInfomation" >
          <a css={css`
            border: 1px solid #ABABAB;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: black;
            padding: 100px;
            border-radius: 5%;
            box-shadow: inset 0 0 20px 7px #ABABAB;
          `}
          href={info.url}
          target="_blank" rel="noreferrer"
          >
            <img css={css`border-radius: 50%;`}src={info.avatar} alt="프로필 사진" width='50%'></img><br />
            <p css={css`text-align:center; margin: 0 auto;`}>
            {info.name}<br /> bio: {info.bio} follwers: {info.followers} follwing: {info.following}
            </p>
          </a>
        </div>
      </ >
    </div>
  );
}

export default App;