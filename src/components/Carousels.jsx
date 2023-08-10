import 'bootstrap/dist/css/bootstrap.css'

function Carousels() {

    return (
    
    <div id="carouselBody01" className="carousel slide">
        <h3>CATEORY TITLE</h3>
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="https://www.bwillcreative.com/wp-content/uploads/2020/05/portrait-orientation-zion-national-park.jpg" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src="https://shotkit.com/wp-content/uploads/2020/07/portrait-orientation.jpg" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src="https://photovideocreative.com/wordpress/wp-content/uploads/2017/11/Paysage-en-orientation-portrait.jpg" className="d-block w-100" alt="..."/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselBody01" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselBody01" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    )
}

export default Carousels
