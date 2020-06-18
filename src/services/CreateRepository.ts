import { uuid } from 'uuidv4';

export interface RepositoryData {
  id?: string,
  title: string,
  url: string,
  techs: string[],
  likes: number
}

export default function createRepository({ title, url, techs, likes = 0 }: RepositoryData){
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  };

  return repository;
}