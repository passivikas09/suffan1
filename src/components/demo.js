export default function DemoFunc() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="fs-1">Chicken Sausages</div>
                    </div>
                    <div className="row" >
                        <div className="col-lg-12">
                    <p className="" >Ingredients</p>
                    <p>Chicken (70.4%), sausage base preparation (Rusk [WHEAT (GLUTEN), salt], salt, spice extract (pepper, nutmeg, ginger), Hydrolysed Vegetable Protein (SOYA), phosphate E450iii, flavour enhancer: E621, sugar, herb extract (sage, thyme), sodium metabisulphite E223 (SULPHITES), spices, antioxidant: E330, E300), water, coriander (1.4%), spice seasoning [dextrose, spices (paprika, cumin, chilli), salt, onions, herbs (thyme, basil), garlic, colour: paprika extract E160c, spice extracts]</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        BARCODE
                    </div>
                    <div className="col-lg-6">
                        <p className="fs-4">Nutritional Values</p>
                        <div className="row">
                            <div className="col-6">
                                <p>Energy</p>
                                <p>Fat</p>
                                <p>Carbohydrate</p>
                                <p>Protien</p>
                                <p>Salt</p>
                                <p>Fiber</p>
                            </div>
                            <div className="col-6">
                                <p>690</p>
                                <p>6.5</p>
                                <p>10.5</p>
                                <p>15.8</p>
                                <p>1.8</p>
                                <p>.8</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ">
                        <div className="col-lg-10  d-flex justify-content-end">
                           <p> Use By: 10-10-2023
                               Weight: 400 g</p>
                        </div>
                    </div>
            </div>
        </>
    )
}

// fetch('https://your-cyclic-domain.com/api/some-endpoint')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from specific domains
// const allowedOrigins = ['https://your-vercel-domain.com', 'http://localhost:3000']; // Add your Vercel domain here
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// Use CORS middleware
// app.use(cors(corsOptions));

// Other middleware and routes
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use('/api', yourApiRoutes);

// Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
