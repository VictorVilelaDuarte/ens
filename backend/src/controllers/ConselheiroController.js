import bd from '../../config/database';

class ConselheiroController {
  lista(req, res) {
    bd.query(
      `SELECT * from ens_conselheiro;
    ;`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar os conselheiros.',
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

export default new ConselheiroController();
