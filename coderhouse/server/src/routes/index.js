import homeRouter from './home.routes.js';
import productRouter from './product.routes.js';
import userRouter from './user.routes.js';
import orderRouter from './order.routes.js';

export function Routers(app){
  app.use('/',homeRouter);
  app.use('/',userRouter);
  app.use('/products',productRouter);
  app.use('/cart',orderRouter);
}

export default Routers;