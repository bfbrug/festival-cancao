import * as Yup from 'yup';
/*
import Rating from '../models/Rating';
import Juror from '../models/Juror';
import Participant from '../models/Participant';
*/

class RatingController {
  async store(req, res) {
    const schema = Yup.object().shape({
      posture: Yup.number()
        .required()
        .positive()
        .max(10),
      voice_quality: Yup.number()
        .required()
        .positive()
        .max(10),
      tuning: Yup.number()
        .required()
        .positive()
        .max(10),
      diction: Yup.number()
        .required()
        .positive()
        .max(10),
      rhythm: Yup.number()
        .required()
        .positive()
        .max(10),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    return res.json('ok');
  }
}

export default new RatingController();
