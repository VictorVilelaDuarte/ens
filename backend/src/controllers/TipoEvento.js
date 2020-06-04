import bd from '../../config/database';

class NoticiaController {
  async lista(req, res) {
    bd.query(`SELECT * FROM ens.ens_evento_tipo;`, (error, results) => {
      if (error) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível buscar os tipos de evento.',
        });
      }
      return res.status(200).json({
        status: true,
        data: results,
      });
    });
  }
}

export default new NoticiaController();
