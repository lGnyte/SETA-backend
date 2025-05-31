import { Router } from 'express';
import { 
  getCharacterByIdController,  
  updateCharacterController, 
  deleteCharacterController,

} from '../controllers/character.controller';



const router = Router();

router.get('/:id', getCharacterByIdController);
router.put('/:id', updateCharacterController);
router.delete('/:id', deleteCharacterController);

export default router;
