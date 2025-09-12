from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = 'LoguisLP'
    PROJECT_VERSION: str = '0.0.1'
    DATABASE_URL: str
    vite_api_base_url: str


    class Config:
        env_file= '.env'

settings=Settings()

