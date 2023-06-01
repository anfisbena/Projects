import homeRouter from './home.routes.js';
import productRouter from './product.routes.js';
import userRouter from './user.routes.js';

export function Routers(app){
  app.use('/',homeRouter);
  app.use('/',userRouter);
  app.use('/products',productRouter);
}

export default Routers;