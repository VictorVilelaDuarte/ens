import bd from '../../config/database';

class CasalController {
  listaOpcao(req, res) {
    bd.query(
      `SELECT Casal_IDMENS, Casal_Nome FROM ens_casal`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar os casais.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }
}

export default new CasalController();
