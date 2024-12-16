/* header */
fetch("../include/header.html")
.then(response => response.text())
.then(data => {
  document.querySelector(".header-include").innerHTML = data;
  /* 추가 코드 */
  /* 
  1. .trigger와 .mega-navi 두 요소 선택 -> 변수 지정
  만약에 이 요소가 없으면 함수 종료
  2. 화면 너비에 따른 동작 설정
  (767px 초과일 때 pc, 767px 이하일 때)
  3. .trigger 클릭 이벤트
  trigger 클릭하면 active 클래스 토글
  .mega-navi display 토글 
  section 부분 클릭하면 mega-navi none 되게
  */
  function checkWidth(){
    let trigger = document.querySelector('.trigger');
    let megaNavi = document.querySelector('.mega-navi');
    if(!trigger || !megaNavi)return; // 요소 존재여부 확인
    if(window.innerWidth > 767){
      trigger.addEventListener('click', function(){
        this.classList.toggle('active');
        megaNavi.style.display = megaNavi.style.display === 'block' ? 'none' : 'block';
      });
      document.querySelectorAll('section').forEach(section =>{
        section.addEventListener('click', function(){
          megaNavi.style.display = 'none';
        })
      })
    }
  }
  checkWidth();

  /* login modal */
  /* 
  btn-login 클릭하면
  .member-login-overlay가 display: block;
  .btn-modal-close 클릭하면
  .member-login-overlay가 display: none;
  */

  let loginBtn = document.querySelector('.btn-login');
  let loginOverlay = document.querySelector('.member-login-overlay');
  let modalClose = document.querySelector('.member-login .btn-modal-close');

  function loginModal(){
    loginOverlay.style.display = loginOverlay.style.display === 'block' ? 'none' : 'block';
  }
  loginBtn.addEventListener('click',loginModal);
  modalClose.addEventListener('click', loginModal);

  /* login alarm */
  /*
  .btn-member-primary 클릭 되었을 때
    .user-alarm 보이게
    .member-login-overlay 숨기기
    .login-register-buttons 숨기기
  */

  function headerLoginAfter(){
    document.querySelector('.btn-member-primary').addEventListener('click', function(){
      document.querySelector('.member-login-overlay').style.display = 'none'; //로그인 모달 숨기기
      document.querySelector('.user-alarm').style.display = 'block'; //유저 알람 표시
      document.querySelector('.login-register-buttons').style.display = 'none'; //로그인 버튼 숨기기
    })
  }
  headerLoginAfter();
})
.catch(error => alert("Error loading header", error));



/* footer */
fetch("../include/footer.html")
.then(response => response.text())
.then(data=>{
  document.querySelector(".footer-include").innerHTML = data;
  /* 각 link-item-title을 누르면 link-item-title에 active가 붙음
  형제 link-item-content의 display:none ↔ display: block
  company-info-trigger 누르면 address 보이게*/

  let footerTitle = document.querySelectorAll(".link-item-title");
  footerTitle.forEach(function(click){
    click.addEventListener('click', function(){
      this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
      this.classList.toggle('active');
    })
  })
  let company = document.querySelector(".company-info-trigger");
  company.addEventListener('click', function(){
    let address = company.nextElementSibling;
    address.style.display = address.style.display === 'block' ? 'none' : 'block';
  })

  function handleResize(){
    let isDesktop = window.innerWidth > 767;
    // 링크 목록 회사 정보 초기화
    footerTitle.forEach(function(item){
      item.nextElementSibling.style.display = isDesktop ? 'block' : 'none' 
    })
    company.nextElementSibling.style.display = isDesktop ? 'block' : 'none';
  }
  window.addEventListener('resize', handleResize);
  handleResize();
})

/* 아코디언 함수 */
function initAccordion(){
  let faqTitle = document.querySelectorAll('.faq-title');
  faqTitle.forEach(title => {
    title.addEventListener('click', function(){
      let faqContent = title.nextElementSibling;
      document.querySelectorAll('.faq-content').forEach(item => {
        if(item !== faqContent){
          item.classList.remove('active');
        }else{
          item.classList.toggle('active');
        }
      })
    })
  })
}

/* documnet loaded시 모든 기능 초기화 */
document.addEventListener('DOMContentLoaded', function(){
  initAccordion();
})