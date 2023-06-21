import homeRouter from './home.routes.js';
import productRouter from './product.routes.js';
import userRouter from './user.routes.js';
import cartRouter from './cart.routes.js';
import chatRouter from './chat.routes.js';
import mockingRouter from './mocking.routes.js';

export function Routers(app){
  app.use('/',homeRouter);
  app.use('/',userRouter);
  app.use('/products',productRouter);
  app.use('/cart',cartRouter);
  app.use('/chat',chatRouter)
  app.use('/mockingproducts',mockingRouter)
}

export default Routers;