import { Router } from 'express';
import { 
  getCharacterByIdController,  
  updateCharacterController, 
  deleteCharacterController,
  uploadCharacterAvatarController,
  generateCharacterAvatarController
} from '../controllers/character.controller';



const router = Router();

router.get('/:id', getCharacterByIdController);
router.put('/:id', updateCharacterController);
router.delete('/:id', deleteCharacterController);
router.post('/:id/avatar', uploadCharacterAvatarController);
router.post('/:id/avatarGeneration', generateCharacterAvatarController);

export default router;
