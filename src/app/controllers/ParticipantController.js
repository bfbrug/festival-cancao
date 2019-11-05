import * as Yup from 'yup';

import Participant from '../models/Participant';

class ParticipantController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const participants = await Participant.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(participants);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const participantExists = await Participant.findOne({
      where: { email: req.body.email },
    });

    if (participantExists) {
      return res.status(400).json({ error: 'Participant already exists.' });
    }
    const { id, name, email } = await Participant.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const { email } = req.body;
    const participant_id = req.params.id;

    const participant = await Participant.findByPk(participant_id);

    if (email !== participant.email) {
      const participantExists = await Participant.findOne({ where: { email } });

      if (participantExists) {
        return res.status(400).json({ error: 'Participant already exists.' });
      }
    }

    const { id, name } = await participant.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new ParticipantController();
