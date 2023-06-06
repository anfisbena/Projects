import homeRouter from './home.routes.js';
import productRouter from './product.routes.js';
import userRouter from './user.routes.js';
import cartRouter from './cart.routes.js';

export function Routers(app){
  app.use('/',homeRouter);
  app.use('/',userRouter);
  app.use('/products',productRouter);
  app.use('/cart',cartRouter);
}

export default Routers;