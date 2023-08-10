import "../css/footer.css"

function Footer() {

    return (
<div>
  <footer className="footer">

    <div className="footerLeft">
      <img src="cookie75.png" className="cookie" alt="cookie icon"/>
      <h2 className="rottenCookies">Rotten Cookies
      </h2>
    </div>

    <div className="footerCenter">
      <div className="footerTop">
        <a className="social" href="https://www.nellysugu.com/">
          🌎
        </a>
        <p>|</p>
        <a className="social" href="https://www.instagram.com/nellysugu/?hl=en">
          <img src="ig.png" className="social" alt="instagram"/>
        </a>
        <p>|</p>
        <a className="social" href="https://twitter.com/nellysugu?lang=en">
          <img src="tw.png" className="social" alt="twitter"/>
        </a>
        <p>|</p>
        <a className="social" href="https://www.youtube.com/channel/UC2VzdOrBSqO2XC0OXg3sA6A">
          <img src="yt.png" className="social" alt="youtube"/>
        </a>
        <p>|</p>
        <a className="social" href="https://secure.givelively.org/donate/technologically-literate-africa-limited/transforming-one-village-at-a-time/nelly-sugu">
          🌍
        </a>
      </div>
      <div className="footerBottom"> 
        <p>_______________________<br></br><br></br>This Page Was Powered By<br></br>The Studends of Nelly Sugu</p>
      </div>
    </div>  
  </footer>
</div>
    )
}

export default Footer
