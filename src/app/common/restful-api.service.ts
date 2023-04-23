import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type ResponseDTO = {
  timestamp: string;
  status: number;
  error?: string;
  path: string;
}

export abstract class CommonRestfulApiService<T, U = T> {
  protected constructor(
    protected readonly httpClient: HttpClient,
    private readonly subdirectory: string,
  ) { }

  public getById(id: number): Observable<U> {
    return this.httpClient.get<U>(`${environment.apiUrl}/${this.subdirectory}/${id}`);
  }

  public delete(id: number): Observable<ResponseDTO> {
    return this.httpClient.delete<ResponseDTO>(`${environment.apiUrl}/${this.subdirectory}/${id}`);
  }

  public update(id: number, item: T): Observable<U> {
    return this.httpClient.put<U>(`${environment.apiUrl}/${this.subdirectory}/${id}`, item);
  }

  public create(item: T): Observable<U> {
    return this.httpClient.post<U>(`${environment.apiUrl}/${this.subdirectory}`, item);
  }
}
