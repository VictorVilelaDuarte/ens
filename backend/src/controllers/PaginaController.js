import bd from '../config/database';

class PaginaController {
  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_pagina WHERE pagina_id=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o conteudo da página.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  altera(req, res) {
    const { id } = req.params;
    const { texto, titulo } = req.body;
    console.log('aqui');
    bd.query(
      `UPDATE ens_pagina SET pagina_nome='${titulo}', pagina_conteudo='${texto}' WHERE pagina_id='${id}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a página.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Página atualizada com sucesso!',
        });
      }
    );
  }
}

export default new PaginaController();
