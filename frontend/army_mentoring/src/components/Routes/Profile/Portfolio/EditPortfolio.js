import React, { useEffect, useState, useContext } from "react";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import "./EditPortfolio.scss";
import { _addPortfolio, _addPortfolioItem } from "../../../../backend/profile";
import { UserContext } from "../../../../context/Context";
import { updateUserContextBySavedToken } from "../../../../backend/auth";

function EditPortfolio({match, history}) {

  const p_id = match.params.pid;
  const [portfolio, setPortfolio] = useState('');
  const [items, setItems] = useState([]);
  //addPortfolio를 위해
  const [user, setUser] = useContext(UserContext);
  const [title, setTitle] = useState('');
  let [forms, setForms] = useState([]);
  let [ordering, setOrdering] = useState(0);

  let isAddPage = false;
  if(match.params.pid == undefined)
    isAddPage = true;


  const add = ()=>{
    const f = {
      order : ordering,
      title : "",
      content : ""
    }
    let form = forms.slice();
    form.push(f);
    setForms(form);
    let o = ordering+1;
    setOrdering(o);
  }

  const remove = (order)=>{
    let form = forms.slice();
    form.splice(order, 1);
    setForms(form);
  }

  const getUserId = ()=>{
    if(Object.keys(user).length == 0)
        return -1;
    const url = user.url;
    const t = url.split('/');
    return t[4];
}
  const addOrEditPortfolio = ()=>{
    if(isAddPage == true){
      let user_id = getUserId();
      _addPortfolio(user_id, title)
      .then(res=>{
        let url = res.data.url;
        let t = url.split('/');
        let pid = t[4]; 
        forms.map((f)=>{
          _addPortfolioItem(f.title, f.content, pid, f.order)
          .then(res=>{
            console.log(res)
          })
          .catch(err=>{
            console.log(err.response);
          });
        })
        updateUserContextBySavedToken(setUser);
        console.log(res);
        history.goBack();
      }).catch(err=>{
        console.log(err.response);
      })
    }
    else{

    }
  }

  const setItemTitle = (e, order)=>{
    const v = e.target.value;
    const f = forms.slice();
    const i = forms.findIndex((element, index, array)=>{
      return element.order == order;
    })
    f[i].title = v;
  }
  const setItemContent = (e, order)=>{
    const v = e.target.value;
    const f = forms.slice();
    const i = forms.findIndex((element, index, array)=>{
      return element.order == order;
    })
    f[i].content = v;
  }
  
  return (
    <div className="edit-portfolio-body">
      {
         isAddPage && 'this is add page'
      }
      <Form>
        <FormGroup className="main-section">
          <Input type="text" className="main-title" placeholder="메인 제목입력..." onChange={(e)=>setTitle(e.target.value)}></Input>
        </FormGroup>
        {forms.map((f)=>{
          return(
            <FormGroup className="sectiont">
              {"id : " + f.order}
              <Input type="text" id={"title"+f.order} onChange={(e)=>{setItemTitle(e, f.order)}} className="title" placeholder="제목입력..."></Input>
              <Input type="textarea" id={'content'+f.order} onChange={(e)=>{setItemContent(e, f.order)}} className="content" placeholder="내용입력..."></Input>
              <Button className="c" onClick={()=>{remove(f.order)}}>-</Button>
            </FormGroup>
          )
        })}
        <div className='button' onClick={add}>+</div>
        <FormGroup className='buttons'>
          <div className='cancel button' onClick={()=>{history.goBack()}}>취소</div>   
          <div className='confirm button' onClick={()=>{addOrEditPortfolio()}}>{ isAddPage ? '추가' : '수정'}</div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default EditPortfolio;