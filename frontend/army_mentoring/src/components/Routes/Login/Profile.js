import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import soldier from "../img/soldier.png";
import "./Profile.scss";

function Profile() {
  const user = [
    {
      id: 1,
      name: "김00",
      nickname: "열혈 멘토",
      email: "guntor@email.com",
      img: "./soldier.png",
      level: 6,
      experience: 25
    }
  ];
  const info = user.map((user) => (
    <h3 key={user.id}>
      {user.name} / {user.nickname} / {user.email}
    </h3>
  ));

  const level_progress = user.map((user) => (
    <div>
      <h3 key={user.id}>Lv. {user.level} </h3>
      <Progress value={user.experience} />
    </div>
  ));

  const mentor_mentorings = [
    {
      id: 1,
      title: "#1. 멘토링 제목"
    },
    {
      id: 2,
      title: "#2. 멘토링 제목"
    }
  ];
  const mentor_mentoringsList = mentor_mentorings.map((mentor_mentoring) => (
    <li key={mentor_mentoring.id}>{mentor_mentoring.title}</li>
  ));
  const mentee_mentorings = [
    {
      id: 1,
      title: "멘티로 참여하는 멘토링 #1"
    },
    {
      id: 2,
      title: "멘티로 참여하는 멘토링 #2"
    }
  ];
  const mentee_mentoringsList = mentee_mentorings.map((mentee_mentoring) => (
    <li key={mentee_mentoring.id}>{mentee_mentoring.title}</li>
  ));
  return (
    <div className="profile">
      <div className="Intro">
        <img className="MyImg" scr={user.img} alt="내 사진"></img>
        <h1>한줄소개</h1>
        <h3>{info}</h3>
        {level_progress}
        <button className="GoProtfolio">포트폴리오 보기</button>
      </div>
      <button className="DM">send a message</button>

      <div className="mentor_mentorings">{mentor_mentoringsList}</div>
      <div className="blank"></div>
      <div className="mentee_mentorings">{mentee_mentoringsList}</div>
    </div>
  );
}

export default Profile;

/*
    const showInfo = ()=>{
        const token = sessionStorage.getItem('userinfo');
        axios({                                 //유저정보 요청
            method : 'GET',
            url : 'https://???/auth/user/',
            headers : { "token" : token.token }
        }).then(function(res)=>{                
            const response = res.data;
            setUserInfo(JSON.parse(response));  //받은 유저정보를 state에 저장
        })
    }
*/