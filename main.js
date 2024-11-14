!function(){"use strict";const e={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn-disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},t=(e,t,r)=>{e.querySelector(`#${t.id}-error`).textContent="",t.classList.remove(r.inputErrorClass)},r=(e,t,r)=>{(e=>e.some((e=>!e.validity.valid)))(e)?n(t,r):(t.disabled=!1,t.classList.remove(r.inactiveButtonClass))},n=(e,t)=>{e.disabled=!0,e.classList.add(t.inactiveButtonClass)},o=new class{constructor(e){let{baseUrl:t,headers:r}=e;this._baseUrl=t,this._headers=r}getAppInfo(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}_checkResponse(e){if(e.ok)return e.json();Promise.reject(`Error: ${e.status}`)}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then(this._checkResponse)}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then(this._checkResponse)}editUserInfo(e){let{name:t,about:r}=e;return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:r})}).then(this._checkResponse)}editAvatarInfo(e){let{avatar:t}=e;return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then(this._checkResponse)}addCards(e){let{name:t,link:r}=e;return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:r})}).then(this._checkResponse)}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"Delete",headers:this._headers}).then(this._checkResponse)}handleLikeButton(e,t){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:t?"DELETE":"PUT",headers:this._headers}).then(this._checkResponse)}}({baseUrl:"https://around-api.en.tripleten-services.com/v1",headers:{authorization:"39df9e1c-6ec2-44d1-a3b6-60d6e9498d03","Content-Type":"application/json"}});o.getAppInfo().then((e=>{let[t,r]=e;t.forEach((e=>{const t=N(e);P.prepend(t)})),l.textContent=r.name,i.textContent=r.about,d.src=r.avatar})).catch((e=>{console.error(e)}));const a=document.querySelector(".profile__edit-btn"),c=document.querySelector(".profile__add-btn"),s=document.querySelector(".profile__avatar-btn"),l=document.querySelector(".profile__name"),i=document.querySelector(".profile__description"),d=document.querySelector(".profile__avatar"),u=document.querySelector("#edit-modal"),_=u.querySelector(".modal__form"),m=u.querySelector(".modal__close-btn"),h=u.querySelector("#profile-name-input"),v=u.querySelector("#profile-description-input"),y=(document.querySelector(".card__image"),document.querySelector(".card__title"),document.querySelector("#add-card-modal")),f=y.querySelector(".modal__form"),p=y.querySelector(".modal__submit-btn"),S=y.querySelector(".modal__close-btn"),b=y.querySelector("#add-card-link-input"),q=y.querySelector("#add-card-caption-input"),k=document.querySelector("#preview-modal"),L=document.querySelector(".modal__image"),C=document.querySelector(".modal__caption"),E=k.querySelector(".modal__close-btn_type_preview"),g=document.querySelector("#avatar-modal"),x=g.querySelector(".modal__form"),U=(g.querySelector(".modal__submit-btn"),g.querySelector(".modal__close-btn")),$=g.querySelector("#profile-avatar-input"),I=document.querySelector("#delete-modal"),A=I.querySelector(".modal__form"),D=I.querySelector(".modal__submit-btn_cancel"),R=I.querySelector(".modal__close-btn"),B=document.querySelector("#card-template"),P=document.querySelector(".cards__list");let T,w;function N(e){const t=B.content.querySelector(".card").cloneNode(!0),r=t.querySelector(".card__title"),n=t.querySelector(".card__image"),a=t.querySelector(".card__like-btn"),c=t.querySelector(".card__delete-btn");return r.textContent=e.name,n.src=e.link,n.alt=e.name,a.addEventListener("click",(t=>function(e,t){const r=e.target.classList.contains("card__like-btn_liked");o.handleLikeButton(t,r).then((()=>{e.target.classList.toggle("card__like-btn_liked")})).catch(console.error)}(t,e._id))),e.isLiked&&a.classList.add("card__like-btn_liked"),c.addEventListener("click",(()=>function(e,t){T=e,w=t,J(I)}(t,e._id))),n.addEventListener("click",(()=>{J(k),C.textContent=e.name,L.src=e.link,L.alt=e.name})),t}function O(e){e.target.classList.contains("modal_opened")&&H(e.target)}function j(e){"Escape"===e.key&&H(document.querySelector(".modal_opened"))}function J(e){e.classList.add("modal_opened"),e.addEventListener("click",O),document.addEventListener("keydown",j)}function H(e){e.classList.remove("modal_opened"),e.removeEventListener("click",O),document.removeEventListener("keydown",j)}a.addEventListener("click",(()=>{var r,n;h.value=l.textContent,v.value=i.textContent,r=_,n=e,[h,v].forEach((e=>{t(r,e,n)})),J(u)})),m.addEventListener("click",(()=>{H(u)})),c.addEventListener("click",(()=>{J(y)})),S.addEventListener("click",(()=>{H(y)})),E.addEventListener("click",(()=>{H(k)})),s.addEventListener("click",(()=>{J(g)})),U.addEventListener("click",(()=>{H(g)})),D.addEventListener("click",(()=>{H(I)})),R.addEventListener("click",(()=>{H(I)})),_.addEventListener("submit",(function(e){e.preventDefault();const t=e.submitter;t.textContent="Saving...",o.editUserInfo({name:h.value,about:v.value}).then((e=>{l.textContent=e.name,i.textContent=e.about,H(u)})).catch(console.error).finally((()=>{t.textContent="Save"}))})),f.addEventListener("submit",(function(t){t.preventDefault();const r=t.submitter;r.textContent="Saving...",o.addCards({name:q.value,link:b.value}).then((t=>{const r=N(t);P.prepend(r),H(y),f.reset(),n(p,e)})).catch(console.error).finally((()=>{r.textContent="Save"}))})),x.addEventListener("submit",(function(e){e.preventDefault();const t=e.submitter;t.textContent="Saving...",o.editAvatarInfo({avatar:$.value}).then((e=>{d.src=e.avatar,H(g)})).catch(console.error).finally((()=>{t.textContent="Save"}))})),A.addEventListener("submit",(function(e){e.preventDefault();const t=e.submitter;t.textContent="Deleting...",o.deleteCard(w).then((()=>{T.remove(),H(I)})).catch(console.error).finally((()=>{t.textContent="Delete"}))})),(e=>{const n=document.querySelectorAll(e.formSelector);n.forEach((n=>{((e,n)=>{const o=Array.from(e.querySelectorAll(n.inputSelector)),a=e.querySelector(n.submitButtonSelector);r(o,a,n),o.forEach((c=>{c.addEventListener("input",(function(){((e,r,n)=>{r.validity.valid?t(e,r,n):((e,t,r,n)=>{e.querySelector(`#${t.id}-error`).textContent=r,t.classList.add(n.inputErrorClass)})(e,r,r.validationMessage,n)})(e,c,n),r(o,a,n)}))}))})(n,e)})),console.log(n)})(e)}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxnQkFBZ0IsRUFXM0NrSixDQUFlL0ksRUFBUUMsRUFBU0EsRUFBUWdKLGtCQUFtQi9JLEVBRzdELEVBcUNJNEksQ0FBbUI5SSxFQUFRNkksRUFBYzNJLEdBQ3pDTSxFQUFrQkMsRUFBV21JLEVBQWUxSSxFQUM5QyxHQUFFLEdBQ0YsRUFNQXVJLENBQWtCekksRUFBUUUsRUFBTyxJQUVuQ3NFLFFBQVEwRSxJQUFJWCxFQUFTLEVDMk92QlksQ0FBaUIzSixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9zY3JpcHRzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9zcG90cy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X3Nwb3RzLy4vc3JjL3V0aWxzL0FwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XHJcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxyXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxyXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fc3VibWl0LWJ0blwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3N1Ym1pdC1idG4tZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2lucHV0X3R5cGVfZXJyb3JcIixcclxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxyXG59O1xyXG5cclxuY29uc3Qgc2hvd0lucHV0RXJyb3IgPSAoZm9ybUVsLCBpbnB1dEVsLCBlcnJNZXNzYWdlLCBjb25maWcpID0+IHtcclxuICBjb25zdCBlcnJNZXNzYWdlSWQgPSBmb3JtRWwucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcclxuICBlcnJNZXNzYWdlSWQudGV4dENvbnRlbnQgPSBlcnJNZXNzYWdlO1xyXG4gIGlucHV0RWwuY2xhc3NMaXN0LmFkZChjb25maWcuaW5wdXRFcnJvckNsYXNzKTtcclxufTtcclxuXHJcbmNvbnN0IGhpZGVJbnB1dEVycm9yID0gKGZvcm1FbCwgaW5wdXRFbCwgY29uZmlnKSA9PiB7XHJcbiAgY29uc3QgZXJyTWVzc2FnZUlkID0gZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWwuaWR9LWVycm9yYCk7XHJcbiAgZXJyTWVzc2FnZUlkLnRleHRDb250ZW50ID0gXCJcIjtcclxuICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmlucHV0RXJyb3JDbGFzcyk7XHJcbn07XHJcblxyXG5jb25zdCBjaGVja0lucHV0VmFsaWRpdHkgPSAoZm9ybUVsLCBpbnB1dEVsLCBjb25maWcpID0+IHtcclxuICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcclxuICAgIHNob3dJbnB1dEVycm9yKGZvcm1FbCwgaW5wdXRFbCwgaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSwgY29uZmlnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsLCBpbnB1dEVsLCBjb25maWcpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhc0ludmFsaWRJbnB1dCA9IChpbnB1dExpc3QpID0+IHtcclxuICByZXR1cm4gaW5wdXRMaXN0LnNvbWUoKGlucHV0KSA9PiB7XHJcbiAgICByZXR1cm4gIWlucHV0LnZhbGlkaXR5LnZhbGlkO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgdG9nZ2xlQnV0dG9uU3RhdGUgPSAoaW5wdXRMaXN0LCBidXR0b25FbCwgY29uZmlnKSA9PiB7XHJcbiAgaWYgKGhhc0ludmFsaWRJbnB1dChpbnB1dExpc3QpKSB7XHJcbiAgICBkaXNhYmxlZEJ1dHRvbihidXR0b25FbCwgY29uZmlnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYnV0dG9uRWwuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGJ1dHRvbkVsLmNsYXNzTGlzdC5yZW1vdmUoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlZEJ1dHRvbiA9IChidXR0b25FbCwgY29uZmlnKSA9PiB7XHJcbiAgYnV0dG9uRWwuZGlzYWJsZWQgPSB0cnVlO1xyXG4gIGJ1dHRvbkVsLmNsYXNzTGlzdC5hZGQoY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc2V0VmFsaWRhdGlvbiA9IChmb3JtRWwsIGlucHV0TGlzdCwgY29uZmlnKSA9PiB7XHJcbiAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWwsIGlucHV0LCBjb25maWcpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0RXZlbnRMaXN0ZW5lcnMgPSAoZm9ybUVsLCBjb25maWcpID0+IHtcclxuICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKGZvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKSk7XHJcbiAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGZvcm1FbC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XHJcblxyXG4gIHRvZ2dsZUJ1dHRvblN0YXRlKGlucHV0TGlzdCwgYnV0dG9uRWxlbWVudCwgY29uZmlnKTtcclxuXHJcbiAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNoZWNrSW5wdXRWYWxpZGl0eShmb3JtRWwsIGlucHV0RWxlbWVudCwgY29uZmlnKTtcclxuICAgICAgdG9nZ2xlQnV0dG9uU3RhdGUoaW5wdXRMaXN0LCBidXR0b25FbGVtZW50LCBjb25maWcpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZW5hYmxlVmFsaWRhdGlvbiA9IChjb25maWcpID0+IHtcclxuICBjb25zdCBmb3JtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmZvcm1TZWxlY3Rvcik7XHJcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XHJcbiAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtRWwsIGNvbmZpZyk7XHJcbiAgfSk7XHJcbiAgY29uc29sZS5sb2coZm9ybUxpc3QpO1xyXG59O1xyXG4iLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xyXG5pbXBvcnQge1xyXG4gIGVuYWJsZVZhbGlkYXRpb24sXHJcbiAgc2V0dGluZ3MsXHJcbiAgcmVzZXRWYWxpZGF0aW9uLFxyXG4gIGRpc2FibGVkQnV0dG9uLFxyXG59IGZyb20gXCIuLi9zY3JpcHRzL3ZhbGlkYXRpb24uanNcIjtcclxuaW1wb3J0IEFwaSBmcm9tIFwiLi4vdXRpbHMvQXBpLmpzXCI7XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcclxuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLWFwaS5lbi50cmlwbGV0ZW4tc2VydmljZXMuY29tL3YxXCIsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgYXV0aG9yaXphdGlvbjogXCIzOWRmOWUxYy02ZWMyLTQ0ZDEtYTNiNi02MGQ2ZTk0OThkMDNcIixcclxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuYXBpXHJcbiAgLmdldEFwcEluZm8oKVxyXG4gIC50aGVuKChbY2FyZHMsIHVzZXJJbmZvXSkgPT4ge1xyXG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZEl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBnZXRDYXJkRWxlbWVudChjYXJkSXRlbSk7XHJcbiAgICAgIGNhcmRzTGlzdC5wcmVwZW5kKGNhcmRFbGVtZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gdXNlckluZm8ubmFtZTtcclxuICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHVzZXJJbmZvLmFib3V0O1xyXG4gICAgcHJvZmlsZUF2YXRhci5zcmMgPSB1c2VySW5mby5hdmF0YXI7XHJcbiAgfSlcclxuICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gIH0pO1xyXG5cclxuLy8gUHJvZmlsZSBFbGVtZW50c1xyXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fZWRpdC1idG5cIik7XHJcbmNvbnN0IHByb2ZpbGVBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idG5cIik7XHJcbmNvbnN0IGF2YXRhck1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hdmF0YXItYnRuXCIpO1xyXG5jb25zdCBwcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fbmFtZVwiKTtcclxuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiKTtcclxuY29uc3QgcHJvZmlsZUF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYXZhdGFyXCIpO1xyXG5cclxuY29uc3QgbW9kYWxFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LW1vZGFsXCIpO1xyXG5jb25zdCBtb2RhbEVkaXRGb3JtID0gbW9kYWxFZGl0LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XHJcbmNvbnN0IHByb2ZpbGVDbG9zZUJ1dHRvbiA9IG1vZGFsRWRpdC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jbG9zZS1idG5cIik7XHJcbmNvbnN0IG1vZGFsTmFtZUlucHV0ID0gbW9kYWxFZGl0LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1uYW1lLWlucHV0XCIpO1xyXG5jb25zdCBtb2RhbERlc2NyaXB0aW9uSW5wdXQgPSBtb2RhbEVkaXQucXVlcnlTZWxlY3RvcihcclxuICBcIiNwcm9maWxlLWRlc2NyaXB0aW9uLWlucHV0XCJcclxuKTtcclxuXHJcbi8vIENhcmQgRWxlbWVudHNcclxuY29uc3QgY2FyZEltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcclxuY29uc3QgbW9kYWxDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtY2FyZC1tb2RhbFwiKTtcclxuY29uc3QgbW9kYWxDYXJkRm9ybSA9IG1vZGFsQ2FyZC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xyXG4vLyBjb25zdCBjYXJkRm9ybSA9IG1vZGFsQ2FyZC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLWZvcm1cIik7XHJcbmNvbnN0IGNhcmRTdWJtaXRCdG4gPSBtb2RhbENhcmQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0blwiKTtcclxuY29uc3QgcHJvZmlsZUNhcmRDbG9zZUJ0biA9IG1vZGFsQ2FyZC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jbG9zZS1idG5cIik7XHJcbmNvbnN0IGNhcmRMaW5rSW5wdXQgPSBtb2RhbENhcmQucXVlcnlTZWxlY3RvcihcIiNhZGQtY2FyZC1saW5rLWlucHV0XCIpO1xyXG5jb25zdCBjYXJkQ2FwdGlvbklucHV0ID0gbW9kYWxDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWNhcmQtY2FwdGlvbi1pbnB1dFwiKTtcclxuXHJcbi8vIFByZXZpZXcgRWxlbWVudHNcclxuY29uc3QgcHJldmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmV2aWV3LW1vZGFsXCIpO1xyXG5jb25zdCBwcmV2aWV3TW9kYWxJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcclxuY29uc3QgcHJldmlld01vZGFsVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XHJcbmNvbnN0IHByZXZpZXdNb2RhbENsb3NlID0gcHJldmlld01vZGFsLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIubW9kYWxfX2Nsb3NlLWJ0bl90eXBlX3ByZXZpZXdcIlxyXG4pO1xyXG5cclxuLy8gQXZhdGFyIEVsZW1lbnRzXHJcbmNvbnN0IGF2YXRhck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdmF0YXItbW9kYWxcIik7XHJcbmNvbnN0IGF2YXRhckZvcm0gPSBhdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xyXG5jb25zdCBhdmF0YXJTdWJtaXRCdG4gPSBhdmF0YXJNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19zdWJtaXQtYnRuXCIpO1xyXG5jb25zdCBhdmF0YXJDbG9zZUJ0biA9IGF2YXRhck1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Nsb3NlLWJ0blwiKTtcclxuY29uc3QgYXZhdGFyTGlua0lucHV0ID0gYXZhdGFyTW9kYWwucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWF2YXRhci1pbnB1dFwiKTtcclxuXHJcbi8vIERlbGV0ZSBFbGVtZW50c1xyXG5jb25zdCBkZWxldGVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsXCIpO1xyXG5jb25zdCBkZWxldGVGb3JtID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuY29uc3QgZGVsZXRlQ2FuY2VsID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fc3VibWl0LWJ0bl9jYW5jZWxcIik7XHJcbmNvbnN0IGRlbGV0ZUNsb3NlID0gZGVsZXRlTW9kYWwucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2xvc2UtYnRuXCIpO1xyXG5cclxuY29uc3QgY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXRlbXBsYXRlXCIpO1xyXG5jb25zdCBjYXJkc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saXN0XCIpO1xyXG5cclxubGV0IHNlbGVjdGVkQ2FyZDtcclxubGV0IHNlbGVjdGVkQ2FyZElkO1xyXG5cclxuLy9DYXJkIENyZWF0ZXJcclxuZnVuY3Rpb24gZ2V0Q2FyZEVsZW1lbnQoZGF0YSkge1xyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZFRlbXBsYXRlLmNvbnRlbnRcclxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgIC5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gIGNvbnN0IGNhcmROYW1lRWwgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xyXG4gIGNvbnN0IGNhcmRJbWdFbCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgY29uc3QgY2FyZExpa2VCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnRuXCIpO1xyXG4gIGNvbnN0IGNhcmREZWxldGVCdG4gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XHJcblxyXG4gIGNhcmROYW1lRWwudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgY2FyZEltZ0VsLnNyYyA9IGRhdGEubGluaztcclxuICBjYXJkSW1nRWwuYWx0ID0gZGF0YS5uYW1lO1xyXG5cclxuICBjYXJkTGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gaGFuZGxlTGlrZUJ0bihldnQsIGRhdGEuX2lkKSk7XHJcblxyXG4gIGlmIChkYXRhLmlzTGlrZWQpIHtcclxuICAgIGNhcmRMaWtlQnRuLmNsYXNzTGlzdC5hZGQoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcclxuICB9XHJcblxyXG4gIGNhcmREZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XHJcbiAgICBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBkYXRhLl9pZClcclxuICApO1xyXG5cclxuICBjYXJkSW1nRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIG9wZW5Nb2RhbChwcmV2aWV3TW9kYWwpO1xyXG5cclxuICAgIHByZXZpZXdNb2RhbFRleHQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICBwcmV2aWV3TW9kYWxJbWcuc3JjID0gZGF0YS5saW5rO1xyXG4gICAgcHJldmlld01vZGFsSW1nLmFsdCA9IGRhdGEubmFtZTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGNhcmRFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNb2RhbE92ZXJsYXkoZXZ0KSB7XHJcbiAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxfb3BlbmVkXCIpKSB7XHJcbiAgICBjbG9zZU1vZGFsKGV2dC50YXJnZXQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlTW9kYWxFc2NhcGUoZXZ0KSB7XHJcbiAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgIGNvbnN0IG9wZW5lZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9vcGVuZWRcIik7XHJcbiAgICBjbG9zZU1vZGFsKG9wZW5lZE1vZGFsKTtcclxuICB9XHJcbn1cclxuXHJcbi8vT3BlbnMgbW9kYWxcclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XHJcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICBtb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlTW9kYWxPdmVybGF5KTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVNb2RhbEVzY2FwZSk7XHJcbn1cclxuXHJcbi8vQ2xvc2VzIG1vZGFsXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcclxuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gIG1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbE92ZXJsYXkpO1xyXG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZU1vZGFsRXNjYXBlKTtcclxufVxyXG5cclxuLy9Qcm9maWxlIHN1Ym1pdCBoYW5kbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KGV2dCkge1xyXG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xyXG4gIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU2F2aW5nLi4uXCI7XHJcblxyXG4gIGFwaVxyXG4gICAgLmVkaXRVc2VySW5mbyh7XHJcbiAgICAgIG5hbWU6IG1vZGFsTmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICBhYm91dDogbW9kYWxEZXNjcmlwdGlvbklucHV0LnZhbHVlLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gICAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLmFib3V0O1xyXG4gICAgICBjbG9zZU1vZGFsKG1vZGFsRWRpdCk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpXHJcbiAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vQXZhdGFyIHN1Ym1pdCBoYW5kbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZUF2YXRhclN1Ym1pdChldnQpIHtcclxuICBldnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3Qgc3VibWl0QnRuID0gZXZ0LnN1Ym1pdHRlcjtcclxuICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlNhdmluZy4uLlwiO1xyXG5cclxuICBhcGlcclxuICAgIC5lZGl0QXZhdGFySW5mbyh7XHJcbiAgICAgIGF2YXRhcjogYXZhdGFyTGlua0lucHV0LnZhbHVlLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBwcm9maWxlQXZhdGFyLnNyYyA9IGRhdGEuYXZhdGFyO1xyXG4gICAgICBjbG9zZU1vZGFsKGF2YXRhck1vZGFsKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcclxuICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9DYXJkIHN1Ym1pdCBoYW5kbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUNhcmQoZXZ0KSB7XHJcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGV2dC5zdWJtaXR0ZXI7XHJcbiAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTYXZpbmcuLi5cIjtcclxuXHJcbiAgYXBpXHJcbiAgICAuYWRkQ2FyZHMoe1xyXG4gICAgICBuYW1lOiBjYXJkQ2FwdGlvbklucHV0LnZhbHVlLFxyXG4gICAgICBsaW5rOiBjYXJkTGlua0lucHV0LnZhbHVlLFxyXG4gICAgfSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZ2V0Q2FyZEVsZW1lbnQoZGF0YSk7XHJcbiAgICAgIGNhcmRzTGlzdC5wcmVwZW5kKGNhcmRFbGVtZW50KTtcclxuICAgICAgY2xvc2VNb2RhbChtb2RhbENhcmQpO1xyXG4gICAgICBtb2RhbENhcmRGb3JtLnJlc2V0KCk7XHJcbiAgICAgIGRpc2FibGVkQnV0dG9uKGNhcmRTdWJtaXRCdG4sIHNldHRpbmdzKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcclxuICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTYXZlXCI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9EZWxldGUgc3VibWl0IGhhbmRsZXJcclxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlU3VibWl0KGV2dCkge1xyXG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBzdWJtaXRCdG4gPSBldnQuc3VibWl0dGVyO1xyXG4gIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiRGVsZXRpbmcuLi5cIjtcclxuXHJcbiAgYXBpXHJcbiAgICAuZGVsZXRlQ2FyZChzZWxlY3RlZENhcmRJZClcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgc2VsZWN0ZWRDYXJkLnJlbW92ZSgpO1xyXG4gICAgICBjbG9zZU1vZGFsKGRlbGV0ZU1vZGFsKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcilcclxuICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL0dlbmVyYXRlcyBDYXJkIGlkc1xyXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkKGNhcmRFbGVtZW50LCBjYXJkSWQpIHtcclxuICBzZWxlY3RlZENhcmQgPSBjYXJkRWxlbWVudDtcclxuICBzZWxlY3RlZENhcmRJZCA9IGNhcmRJZDtcclxuXHJcbiAgb3Blbk1vZGFsKGRlbGV0ZU1vZGFsKTtcclxufVxyXG5cclxuLy9MaWtlIGJ1dHRvbiBoYW5kbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZUxpa2VCdG4oZXZ0LCBpZCkge1xyXG4gIGNvbnN0IGlzTGlrZWQgPSBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRfX2xpa2UtYnRuX2xpa2VkXCIpO1xyXG5cclxuICBhcGlcclxuICAgIC5oYW5kbGVMaWtlQnV0dG9uKGlkLCBpc0xpa2VkKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ0bl9saWtlZFwiKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XHJcbn1cclxuXHJcbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgbW9kYWxOYW1lSW5wdXQudmFsdWUgPSBwcm9maWxlTmFtZS50ZXh0Q29udGVudDtcclxuICBtb2RhbERlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQ7XHJcbiAgcmVzZXRWYWxpZGF0aW9uKFxyXG4gICAgbW9kYWxFZGl0Rm9ybSxcclxuICAgIFttb2RhbE5hbWVJbnB1dCwgbW9kYWxEZXNjcmlwdGlvbklucHV0XSxcclxuICAgIHNldHRpbmdzXHJcbiAgKTtcclxuICBvcGVuTW9kYWwobW9kYWxFZGl0KTtcclxufSk7XHJcblxyXG4vL0J1dHRvbiBFdmVudCBMaXN0ZW5lcnNcclxucHJvZmlsZUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbChtb2RhbEVkaXQpO1xyXG59KTtcclxuXHJcbnByb2ZpbGVBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBvcGVuTW9kYWwobW9kYWxDYXJkKTtcclxufSk7XHJcblxyXG5wcm9maWxlQ2FyZENsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbChtb2RhbENhcmQpO1xyXG59KTtcclxuXHJcbnByZXZpZXdNb2RhbENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbChwcmV2aWV3TW9kYWwpO1xyXG59KTtcclxuXHJcbmF2YXRhck1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgb3Blbk1vZGFsKGF2YXRhck1vZGFsKTtcclxufSk7XHJcblxyXG5hdmF0YXJDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNsb3NlTW9kYWwoYXZhdGFyTW9kYWwpO1xyXG59KTtcclxuXHJcbmRlbGV0ZUNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNsb3NlTW9kYWwoZGVsZXRlTW9kYWwpO1xyXG59KTtcclxuXHJcbmRlbGV0ZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbChkZWxldGVNb2RhbCk7XHJcbn0pO1xyXG5cclxuLy9TdWJtaXQgRXZlbnQgTGlzdGVuZXJcclxubW9kYWxFZGl0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KTtcclxubW9kYWxDYXJkRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUNyZWF0ZUNhcmQpO1xyXG5hdmF0YXJGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlQXZhdGFyU3VibWl0KTtcclxuZGVsZXRlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZURlbGV0ZVN1Ym1pdCk7XHJcblxyXG5lbmFibGVWYWxpZGF0aW9uKHNldHRpbmdzKTtcclxuIiwiLy8gdXRpbHMvQXBpLmpzXHJcblxyXG5jbGFzcyBBcGkge1xyXG4gIGNvbnN0cnVjdG9yKHsgYmFzZVVybCwgaGVhZGVycyB9KSB7XHJcbiAgICAvLyBjb25zdHJ1Y3RvciBib2R5XHJcbiAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcclxuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXBwSW5mbygpIHtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5nZXRJbml0aWFsQ2FyZHMoKSwgdGhpcy5nZXRVc2VySW5mbygpXSk7XHJcbiAgfVxyXG5cclxuICBfY2hlY2tSZXNwb25zZShyZXMpIHtcclxuICAgIGlmIChyZXMub2spIHtcclxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7cmVzLnN0YXR1c31gKTtcclxuICB9XHJcblxyXG4gIGdldEluaXRpYWxDYXJkcygpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSk7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWAsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcclxuICAgIH0pLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSk7XHJcbiAgfVxyXG5cclxuICBlZGl0VXNlckluZm8oeyBuYW1lLCBhYm91dCB9KSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBhYm91dCxcclxuICAgICAgfSksXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xyXG4gIH1cclxuXHJcbiAgZWRpdEF2YXRhckluZm8oeyBhdmF0YXIgfSkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhcmAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBhdmF0YXIsXHJcbiAgICAgIH0pLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIGFkZENhcmRzKHsgbmFtZSwgbGluayB9KSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGxpbmssXHJcbiAgICAgIH0pLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUNhcmQoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIkRlbGV0ZVwiLFxyXG4gICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxyXG4gICAgfSkudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUxpa2VCdXR0b24oaWQsIGlzTGlrZWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2lkfS9saWtlc2AsIHtcclxuICAgICAgbWV0aG9kOiBpc0xpa2VkID8gXCJERUxFVEVcIiA6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXHJcbiAgICB9KS50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IHRoZSBjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcbiJdLCJuYW1lcyI6WyJzZXR0aW5ncyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiaGlkZUlucHV0RXJyb3IiLCJmb3JtRWwiLCJpbnB1dEVsIiwiY29uZmlnIiwicXVlcnlTZWxlY3RvciIsImlkIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ0b2dnbGVCdXR0b25TdGF0ZSIsImlucHV0TGlzdCIsImJ1dHRvbkVsIiwic29tZSIsImlucHV0IiwidmFsaWRpdHkiLCJ2YWxpZCIsImhhc0ludmFsaWRJbnB1dCIsImRpc2FibGVkQnV0dG9uIiwiZGlzYWJsZWQiLCJhZGQiLCJhcGkiLCJjb25zdHJ1Y3RvciIsIl9yZWYiLCJiYXNlVXJsIiwiaGVhZGVycyIsInRoaXMiLCJfYmFzZVVybCIsIl9oZWFkZXJzIiwiZ2V0QXBwSW5mbyIsIlByb21pc2UiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJnZXRVc2VySW5mbyIsIl9jaGVja1Jlc3BvbnNlIiwicmVzIiwib2siLCJqc29uIiwicmVqZWN0Iiwic3RhdHVzIiwiZmV0Y2giLCJ0aGVuIiwiZWRpdFVzZXJJbmZvIiwiX3JlZjIiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRBdmF0YXJJbmZvIiwiX3JlZjMiLCJhdmF0YXIiLCJhZGRDYXJkcyIsIl9yZWY0IiwibGluayIsImRlbGV0ZUNhcmQiLCJoYW5kbGVMaWtlQnV0dG9uIiwiaXNMaWtlZCIsImF1dGhvcml6YXRpb24iLCJjYXJkcyIsInVzZXJJbmZvIiwiZm9yRWFjaCIsImNhcmRJdGVtIiwiY2FyZEVsZW1lbnQiLCJnZXRDYXJkRWxlbWVudCIsImNhcmRzTGlzdCIsInByZXBlbmQiLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInByb2ZpbGVBdmF0YXIiLCJzcmMiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInByb2ZpbGVFZGl0QnV0dG9uIiwiZG9jdW1lbnQiLCJwcm9maWxlQWRkQnV0dG9uIiwiYXZhdGFyTW9kYWxCdXR0b24iLCJtb2RhbEVkaXQiLCJtb2RhbEVkaXRGb3JtIiwicHJvZmlsZUNsb3NlQnV0dG9uIiwibW9kYWxOYW1lSW5wdXQiLCJtb2RhbERlc2NyaXB0aW9uSW5wdXQiLCJtb2RhbENhcmQiLCJtb2RhbENhcmRGb3JtIiwiY2FyZFN1Ym1pdEJ0biIsInByb2ZpbGVDYXJkQ2xvc2VCdG4iLCJjYXJkTGlua0lucHV0IiwiY2FyZENhcHRpb25JbnB1dCIsInByZXZpZXdNb2RhbCIsInByZXZpZXdNb2RhbEltZyIsInByZXZpZXdNb2RhbFRleHQiLCJwcmV2aWV3TW9kYWxDbG9zZSIsImF2YXRhck1vZGFsIiwiYXZhdGFyRm9ybSIsImF2YXRhckNsb3NlQnRuIiwiYXZhdGFyTGlua0lucHV0IiwiZGVsZXRlTW9kYWwiLCJkZWxldGVGb3JtIiwiZGVsZXRlQ2FuY2VsIiwiZGVsZXRlQ2xvc2UiLCJjYXJkVGVtcGxhdGUiLCJzZWxlY3RlZENhcmQiLCJzZWxlY3RlZENhcmRJZCIsImRhdGEiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiY2FyZE5hbWVFbCIsImNhcmRJbWdFbCIsImNhcmRMaWtlQnRuIiwiY2FyZERlbGV0ZUJ0biIsImFsdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJjb250YWlucyIsInRvZ2dsZSIsImhhbmRsZUxpa2VCdG4iLCJfaWQiLCJjYXJkSWQiLCJvcGVuTW9kYWwiLCJoYW5kbGVEZWxldGVDYXJkIiwiaGFuZGxlTW9kYWxPdmVybGF5IiwiY2xvc2VNb2RhbCIsImhhbmRsZU1vZGFsRXNjYXBlIiwia2V5IiwibW9kYWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEJ0biIsInN1Ym1pdHRlciIsImZpbmFsbHkiLCJyZXNldCIsImZvcm1MaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsInNldEV2ZW50TGlzdGVuZXJzIiwiQXJyYXkiLCJmcm9tIiwiYnV0dG9uRWxlbWVudCIsImlucHV0RWxlbWVudCIsImNoZWNrSW5wdXRWYWxpZGl0eSIsInNob3dJbnB1dEVycm9yIiwiZXJyTWVzc2FnZSIsInZhbGlkYXRpb25NZXNzYWdlIiwibG9nIiwiZW5hYmxlVmFsaWRhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=