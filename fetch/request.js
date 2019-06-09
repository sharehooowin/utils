/**
 * Created by xhw on 2017/5/16.
 */
import fetch from 'isomorphic-fetch';
//非简单请求用例
export let postFetch = async (url, body) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body:JSON.stringify(body)
        });
        let json = await response.json();
        return json;
    }
    catch (err) {
        console.log(err)
    }
};

export let formFetch = async (url, body) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      body:formData(body)
    });
    let json = await response.json();
    return json;
  }
  catch (err) {
    console.log(err)
  }
};
export let getFetch = async (url) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    let json = await response.json();
    return json;
  }
  catch (err) {
    console.log(err)
  }
};



let formData = (body)=>{
  let form = new FormData();
  let name;
  for (name in body) {
    console.log(body[name]);
    form.append(name,body[name]);
  }
  return form;
};

