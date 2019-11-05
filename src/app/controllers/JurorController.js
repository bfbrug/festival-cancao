import * as Yup from 'yup';

import Juror from '../models/Juror';

class JurorController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const jurors = await Juror.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(jurors);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const jurorExists = await Juror.findOne({
      where: { email: req.body.email },
    });

    if (jurorExists) {
      return res.status(400).json({ error: 'Jurur already exists.' });
    }
    const { id, name, email, letter } = await Juror.create(req.body);

    return res.json({
      id,
      name,
      email,
      letter,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      letter: Yup.boolean(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const { email, oldPassword } = req.body;
    const juror_id = req.params.id;

    const juror = await Juror.findByPk(juror_id);

    if (email !== juror.email) {
      const jurorExists = await Juror.findOne({ where: { email } });

      if (jurorExists) {
        return res.status(400).json({ error: 'Juror already exists.' });
      }
    }

    if (oldPassword && !(await juror.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, letter } = await juror.update(req.body);

    return res.json({
      id,
      name,
      email,
      letter,
    });
  }
}

export default new JurorController();
