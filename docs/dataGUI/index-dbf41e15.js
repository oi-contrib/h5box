import{i as p}from"./index.umd.min-b64a4e47.js";import{d as D,r as G,f as M,c as T,a as c,F as W,i as B,u as E,o as A,n as H,j as U,t as j,p as O,e as q,_ as J}from"./index-c6acef26.js";const K=(n,o)=>{const r=document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(n,null):n.currentStyle;return typeof o=="string"?r.getPropertyValue(o):r},F=n=>{const o=document.getElementsByTagName("head")[0];o.style.color=n;const r=K(o,"color").replace(/rgba?\(/,"").replace(")","").split(",");for(let l=0;l<r.length;l++)r[l]=+r[l];return r.push(1),[r[0]/255,r[1]/255,r[2]/255,r[3]]},Q=`attribute vec4 a_position;\r
uniform mat4 u_matrix;\r
\r
void main()\r
{\r
    vec4 temp = u_matrix * a_position;\r
\r
    // \u628A\u539F\u751F\u7684WebGL\u4F7F\u7528\u7684\u5DE6\u624B\u5750\u6807\u7CFB\u53D8\u6210\u4E86\u53F3\u624B\u5750\u6807\u7CFB\r
    temp.z = -1.0 * temp.z;\r
\r
    // \u8868\u793A\u773C\u775B\u8DDD\u79BBvec4(0.0,0.0,1.0)\u7684\u8DDD\u79BB\r
    float dist = 4.0;\r
\r
    // \u4F7F\u7528\u6295\u5F71\u76F4\u63A5\u8BA1\u7B97\r
    // \u4E3A\u4FDD\u8BC1\u7EB9\u7406\u548C\u76F8\u5BF9\u4F4D\u7F6E\u6B63\u786E\r
    // x\u3001y\u3001z\u7684\u6539\u53D8\u6EE1\u8DB3\u7EBF\u6027\u53D8\u6362\r
    gl_Position = vec4((dist + 1.0) * temp.x, (dist + 1.0) * temp.y, dist * (dist + temp.z) + 1.0 - dist * dist, temp.w * 2.0 * (dist + temp.z));\r
}`,X=`precision mediump float;\r
\r
uniform vec4 u_color;\r
\r
void main()\r
{\r
    gl_FragColor = u_color;\r
}`,d=[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}],z=n=>(O("data-v-f63efcc4"),n=n(),q(),n),Y={class:"container"},Z=z(()=>c("div",{style:{fontSize:"20px",lineHeight:"50px",fontWeight:600}}," Referer of a Website ",-1)),$=z(()=>c("div",{style:{fontSize:"12px",fontWeight:200}}," Fake Data ",-1)),ee={style:{position:"absolute",textAlign:"left",left:"10px",top:"50px",fontSize:"12px",fontWeight:200}},te=D({__name:"index",setup(n){let o=p.exports.getLoopColors(d.length),r=G();return M(()=>{let l=[];for(let t=0;t<o.length;t++)l.push(F(o[t]));let I=p.exports.getLoopColors(d.length,.9),u=[];for(let t=0;t<o.length;t++)u.push(F(I[t]));let e=p.exports.getWebGLContext(r.value,1,"aspectFill");e.enable(e.DEPTH_TEST);let f=new p.exports.Shader(e).compile(Q,X).use(),P=e.getUniformLocation(f.program,"u_matrix"),m=e.getAttribLocation(f.program,"a_position"),R=e.getUniformLocation(f.program,"u_color"),g=new p.exports.Buffer(e).use(),N=new p.exports.Matrix4().scale(.7,.7,.7).rotate(-1,1,0,0);e.uniformMatrix4fv(P,!1,N.value());let b=0;for(let t=0;t<d.length;t++)b+=d[t].value;let h=Math.PI*-.5;for(let t=0;t<d.length;t++){let x=d[t].value/b*Math.PI*2,y=[],v=[],w=[],S=[],L=Math.ceil(x*r.value.clientHeight*.1),V=.8,k=1.7,a=.1,C=x/L;for(let _=0;_<=L;_++){let i=p.exports.rotate(0,0,h+C*_,k,0),s=p.exports.rotate(0,0,h+C*_,V,0);y.push(i[0],i[1],a,s[0],s[1],a),v.push(i[0],i[1],-a,s[0],s[1],-a),w.push(s[0],s[1],a,s[0],s[1],-a),S.push(i[0],i[1],a,i[0],i[1],-a)}e.uniform4f(R,...l[t]),g.write(new Float32Array(y)).divide(m,3,3,0),e.drawArrays(e.TRIANGLE_STRIP,0,y.length/3),g.write(new Float32Array(v)).divide(m,3,3,0),e.drawArrays(e.TRIANGLE_STRIP,0,v.length/3),e.uniform4f(R,...u[t]),g.write(new Float32Array(w)).divide(m,3,3,0),e.drawArrays(e.TRIANGLE_STRIP,0,w.length/3),g.write(new Float32Array(S)).divide(m,3,3,0),e.drawArrays(e.TRIANGLE_STRIP,0,S.length/3),h+=x}}),(l,I)=>(A(),T("div",Y,[Z,$,c("ul",ee,[(A(!0),T(W,null,B(E(d),(u,e)=>(A(),T("li",{style:{lineHeight:"16px",marginTop:"7px"},key:e},[c("span",{style:H({display:"inline-block",width:"25px",height:"16px",backgroundColor:E(o)[e],verticalAlign:"top",marginRight:"5px",borderRadius:"3px"})},null,4),U(" "+j(u.name),1)]))),128))]),c("div",{ref_key:"elRef",ref:r,style:{height:"435px"}},null,512)]))}});const ne=J(te,[["__scopeId","data-v-f63efcc4"]]);export{ne as default};
