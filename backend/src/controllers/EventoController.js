import bd from '../config/database';

class EventoController {
  listaCompleta(req, res) {
    const year = new Date().getFullYear();
    bd.query(
      `SELECT * FROM ens_evento WHERE YEAR(Evento_Data) = ${year} ORDER BY Evento_Data`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  lista(req, res) {
    let { page } = req.query;
    let offset = 0;
    let numberOfPages = 0;
    page = parseInt(page);
    if (!page) {
      page = 1;
    }

    bd.query('SELECT COUNT (*) as total from ens_evento', (err, result) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Não foi possivel buscar as noticias.',
        });
      }

      const reminder = result[0].total % 10;
      if (reminder) {
        numberOfPages = parseInt(result[0].total / 10) + 1;
      } else {
        numberOfPages = result[0].total / 10;
      }
      if (page < 1) {
        page = 1;
      }
      if (page > numberOfPages) {
        page = numberOfPages;
      }

      if (page > 1) {
        offset = (page - 1) * 10;
      }

      bd.query(
        `SELECT * FROM ens_evento  ORDER BY Evento_Data DESC LIMIT 10 OFFSET ${offset}`,
        (err, result) => {
          if (err) {
            return res.status(400).json({
              staus: false,
              message: 'Não foi possível buscar o evento.',
            });
          }
          return res
            .status(200)
            .header({
              prevPage: page <= 1 ? page : page - 1,
              page,
              nextPage: numberOfPages > page ? page + 1 : page,
              lastPage: numberOfPages,
            })
            .json({
              status: true,
              data: result,
            });
        }
      );
    });
  }

  insere(req, res) {
    const {
      data,
      hora,
      local,
      equipe,
      descricao,
      historico,
      tipo,
      destaque,
    } = req.body;
    bd.query(
      `INSERT INTO ens_evento (Evento_Data, Evento_Horario, Evento_Local, Evento_TipoID, Evento_EquipeResp, Evento_Descricao, Evento_Historico, Evento_Destaque)
       VALUES ('${data}', '${hora}', '${local}', '${tipo}', '${equipe}', '${descricao}', '${historico}', '${destaque}')`,
      (err) => {
        console.log(err);
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Evento registrado com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const { id } = req.params;
    const {
      data,
      hora,
      local,
      equipe,
      descricao,
      historico,
      tipo,
      destaque,
    } = req.body;
    bd.query(
      `UPDATE ens_evento
       SET Evento_Data='${data}', Evento_Horario='${hora}', Evento_Local='${local}', Evento_TipoID='${tipo}', Evento_EquipeResp='${equipe}', Evento_Descricao='${descricao}', Evento_Historico='${historico}', Evento_Destaque='${destaque}'
       WHERE Evento_ID='${id}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Evento atualizado com sucesso!',
        });
      }
    );
  }

  busca(req, res) {
    const { id } = req.params;
    bd.query(
      `SELECT * FROM ens_evento WHERE Evento_ID=${id}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  deleta(req, res) {
    const { id } = req.params;
    bd.query(`DELETE FROM ens_evento WHERE Evento_ID=${id}`, (err, result) => {
      if (err) {
        return res.status(400).json({
          staus: false,
          message: 'Não foi possível excluir o evento.',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Evento deletado com sucesso!',
      });
    });
  }

  home(req, res) {
    let hoje = new Date();
    let mes = new Date();
    mes.setDate(mes.getDate() + 30);

    const hojeDia = hoje.getDate() + 1;
    const hojeMes = hoje.getMonth() + 1;
    const hojeAno = hoje.getFullYear();
    const mesDia = mes.getDate() + 1;
    const mesMes = mes.getMonth() + 1;
    const mesAno = mes.getFullYear();

    hoje = `${hojeAno}-${hojeMes}-${hojeDia}`;
    mes = `${mesAno}-${mesMes}-${mesDia}`;

    console.log(hoje, mes);

    bd.query(
      `SELECT * FROM ens_evento where Evento_Data BETWEEN '${hoje}' AND '${mes}' order by Evento_Data`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar os eventos.',
          });
        }
        return res.status(200).json({
          status: true,
          data: result,
        });
      }
    );
  }

  filtro(req, res) {
    const { mes } = req.body;
    const ano = new Date().getFullYear().toString();
    const data_inicial = `${ano}-${mes}-01`;
    const data_final = `${ano}-${mes}-31`;

    bd.query(
      `SELECT * FROM ens_evento WHERE Evento_Data BETWEEN '${data_inicial}' AND '${data_final}' ORDER BY Evento_Data`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível buscar o evento.',
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

export default new EventoController();
