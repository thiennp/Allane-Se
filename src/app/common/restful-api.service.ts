import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type ResponseDto = {
  timestamp: string;
  status: number;
  error?: string;
  path: string;
}

export abstract class CommonRestfulApiService<T> {
  protected constructor(
    protected readonly httpClient: HttpClient,
    private readonly subdirectory: string,
  ) { }

  public getById(id: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiUrl}/${this.subdirectory}/${id}`);
  }

  public delete(id: string): Observable<ResponseDto> {
    return this.httpClient.delete<ResponseDto>(`${environment.apiUrl}/${this.subdirectory}/${id}`);
  }

  public update(id: string, item: T): Observable<T> {
    return this.httpClient.put<T>(`${environment.apiUrl}/${this.subdirectory}/${id}`, item);
  }

  public create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${environment.apiUrl}/${this.subdirectory}`, item);
  }
}
