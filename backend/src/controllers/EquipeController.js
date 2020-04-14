import bd from '../../config/database';

class EquipeController {
  lista(req, res) {
    bd.query(`SELECT * FROM ens_equipe`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível buscar as equipes.',
        });
      }
      return res.status(200).json({
        status: true,
        data: result,
      });
    });
  }

  // insere(req, res) {
  //   const { data, hora, local, equipe, descricao, historico, tipo } = req.body;
  //   bd.query(
  //     `INSERT INTO ens_evento (Evento_Data, Evento_Horario, Evento_Local, Evento_TipoID, Evento_EquipeResp, Evento_Descricao, Evento_Historico)
  //      VALUES ('${data}', '${hora}', '${local}', '${tipo}', '${equipe}', '${descricao}', '${historico}')`,
  //     (err) => {
  //       if (err) {
  //         return res.status(400).json({
  //           staus: false,
  //           message: 'Não foi possível salvar o evento.',
  //         });
  //       }
  //       return res.status(200).json({
  //         status: true,
  //         message: 'Evento registrado com sucesso!',
  //       });
  //     }
  //   );
  // }

  // altera(req, res) {
  //   const { id } = req.params;
  //   const { data, hora, local, equipe, descricao, historico, tipo } = req.body;
  //   bd.query(
  //     `UPDATE ens_evento
  //      SET Evento_Data='${data}', Evento_Horario='${hora}', Evento_Local='${local}', Evento_TipoID='${tipo}', Evento_EquipeResp='${equipe}', Evento_Descricao='${descricao}', Evento_Historico='${historico}'
  //      WHERE Evento_ID='${id}'`,
  //     (err) => {
  //       if (err) {
  //         return res.status(400).json({
  //           staus: false,
  //           message: 'Não foi possível salvar o evento.',
  //         });
  //       }
  //       return res.status(200).json({
  //         status: true,
  //         message: 'Evento atualizado com sucesso!',
  //       });
  //     }
  //   );
  // }

  // busca(req, res) {
  //   const { id } = req.params;
  //   bd.query(
  //     `SELECT * FROM ens_evento WHERE Evento_ID=${id}`,
  //     (err, result) => {
  //       if (err) {
  //         return res.status(400).json({
  //           staus: false,
  //           message: 'Não foi possível buscar o evento.',
  //         });
  //       }
  //       return res.status(200).json({
  //         status: true,
  //         data: result,
  //       });
  //     }
  //   );
  // }

  // deleta(req, res) {
  //   const { id } = req.params;
  //   bd.query(`DELETE FROM ens_evento WHERE Evento_ID=${id}`, (err, result) => {
  //     if (err) {
  //       return res.status(400).json({
  //         staus: false,
  //         message: 'Não foi possível excluir o evento.',
  //       });
  //     }
  //     return res.status(200).json({
  //       status: true,
  //       message: 'Evento deletado com sucesso!',
  //     });
  //   });
  // }
}

export default new EquipeController();
