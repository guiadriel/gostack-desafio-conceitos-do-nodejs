import express from 'express';
import cors from 'cors';

import createRepository, { RepositoryData } from './services/CreateRepository';
import validateUuid from './middlewares/ParamValidator';
const app = express();

app.use(express.json());
app.use(cors());
app.use(["/repositories/:id", "/repositories/:id/like"], validateUuid);

const repositories: Array<RepositoryData> = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
 
  const repository = createRepository({
    title,
    url,
    techs,
    likes: 0
  });

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if( repositoryIndex < 0 ){
    return response.status(400).json({
      error: 'Repository not found.'
    });
  }

  repositories[repositoryIndex] = { ...repositories[repositoryIndex], title, url, techs };

  return response.json( repositories[repositoryIndex] );
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if( repositoryIndex < 0 ){
    return response.status(400).json({
      error: 'Repository not found...'
    });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id );
  if( repositoryIndex < 0 ){
    return response.status(400).json({
      error: 'Repository not found.'
    });
  }
  const likes = ++repositories[repositoryIndex].likes;

  repositories[repositoryIndex] = { ...repositories[repositoryIndex], likes };

  console.log(likes);

  return response.json( repositories[repositoryIndex] );

});

module.exports = app;
