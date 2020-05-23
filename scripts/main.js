const scripts = function() {
    /*selectors*/
  const cursor = document.querySelector('.cursor')
  const header = document.querySelector('header')
  const toTop = document.querySelector('.totop')
  const project = document.querySelectorAll('.project')
  const burger = document.querySelector('.burger')
  const mobileMenu = document.querySelector('.mobile-menu')
  const inViews = document.querySelectorAll('.project-image, .project-video, .project')
  
  /*custom cursor*/
  let mouseX = 0
  let mouseY = 0
  let ballX = 0
  let ballY = 0
  let speed = 0.35
  function animate () {
    let distanceX = mouseX - ballX
    let distanceY = mouseY - ballY
    ballX = ballX + (distanceX * speed)
    ballY = ballY + (distanceY * speed)
    cursor.style.left = (ballX - 20) + 'px'
    cursor.style.top = (ballY - 20) + 'px'
    requestAnimationFrame(animate)
  }
  animate()
  document.addEventListener('mousemove', function (event){
    mouseX = event.pageX
    mouseY = event.pageY
  })

  const allLinks = document.querySelectorAll("a, .totop")
  allLinks.forEach(link => {
    link.addEventListener('mouseover', function(){
      cursor.classList.add('cursor-hover')
    })
    link.addEventListener('mouseleave', function(){
      cursor.classList.remove('cursor-hover')
    })
  })

  const darkAreas = document.querySelectorAll(".dark")
  darkAreas.forEach(area => {
    area.addEventListener('mouseover', function(){
      cursor.classList.add('cursor-light')
    })
    area.addEventListener('mouseleave', function(){
      cursor.classList.remove('cursor-light')
    })
  })

  const arrows = document.querySelectorAll('.next, .prev')
  arrows.forEach(arrow => {
    arrow.addEventListener('mouseover', function() {
      cursor.classList.add('invisible')
    })
    arrow.addEventListener('mouseleave', function() {
      cursor.classList.remove('invisible')
    })
  })
  
  /*scroll to the top*/
  if (toTop) {
      toTop.addEventListener('click', function(e){
        window.scrollTo({top: 0, behavior: 'smooth'});
      })
  }

  if(burger) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('burger-active')
      mobileMenu.classList.toggle('mobile-menu-active')
      const mobileLinks = document.querySelectorAll('.mobile-menu a')
      const tl = gsap.timeline({delay: 0.3});
      tl.from(mobileLinks, {
        opacity: 0, 
        ease: "sine", 
        stagger: 0.1
      })
    })
  }

  /*project image animation*/
  inViews.forEach(view => {
    view.classList.add('project-outofview')
  })
  const observer = new IntersectionObserver (entries => {
    entries.forEach(entry => {
      if(entry.intersectionRatio >= 0.1) {entry.target.classList.remove('project-outofview')}
      else{entry.target.classList.add('project-outofview')}
    })
  },{threshold: [0, 0.1, 1]})

  inViews.forEach(view => {
    observer.observe(view)
  })
    
}

  
scripts()

barba.init({
  transitions: [{
    name: 'switch',
    leave({ current, next, trigger }) {
      return new Promise(resolve => {
        const timeline = gsap.timeline({
          onComplete() {
            current.container.remove()
            resolve()
          }
        })
        timeline
        .to(current.container, {x: '100vw', opacity: 0, duration: 0.5})
      })
    },
    beforeEnter({ next }) {
      gsap.set(next.container, {opacity: 0})
      window.scroll(0, 0)
      return new Promise(resolve => {
        const timeline = gsap.timeline({
          onComplete() {
            resolve()
          }
        })
        timeline
        .to(next.container, {x: '-100vw'})
      })
  },
    enter({ current, next, trigger }) {
      return new Promise(resolve => {
        scripts()
          const imgs = document.querySelectorAll('img')
          imagesLoaded(imgs, function(){
              const timeline = gsap.timeline({
                  onComplete(){
                      resolve()
                  }
              })
              timeline
            .to(next.container, {x: '0vw', opacity: 1, duration: 0.5})
          })
      })
},
    afterEnter(){
      scripts()
    }
  }],
  views: [],
  debug: true
})