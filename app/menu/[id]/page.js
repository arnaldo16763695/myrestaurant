const Page = ({ params }) => {
    let product = ""
       if (params.id==='2') {
        product = "Suchi"
       }else if(params.id==='3'){
        product = "Bebidas"
       }else{
        product= "Snack"
       }
    
      return (
        <div className="flex justify-center ">
          <ul className="  mx-6">
            <li>{`${product} ........................................10$ `}</li>
            <li>{`${product} ........................................10$ `}</li>
            <li>{`${product} ........................................10$ `}</li>
            <li>{`${product} ........................................10$ `}</li>
            <li>{`${product} ........................................10$ `}</li>
          </ul>
        </div>
      );
    };
    
    export default Page;
    