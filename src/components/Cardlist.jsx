const Cardlist = ({ data = [] }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {data.map((item) => {
          const { id, name, power, type, image } = item;
          return (
            <div key={id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={image || 'https://via.placeholder.com/150'} alt={name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">Poder: {power || 'No description available.'}</p> 
                  <p className="card-text">Tipo: {type || 'No description available.'}</p> 
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cardlist;