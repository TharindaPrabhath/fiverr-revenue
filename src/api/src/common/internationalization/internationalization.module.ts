import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path = require('path');

@Module({
    imports: [
        I18nModule.forRoot({
            logging: true,
            fallbackLanguage: 'en',
            fallbacks: {
                'en-*': 'en',
                "zh-*": "tw",
                "ja-*": "jp"
            },
            loaderOptions: {
              path: process.cwd()+'/src/i18n',//path.join(__dirname, '/i18n/'),
              watch: true,
            }, resolvers: [ 
                AcceptLanguageResolver
            ] }),
    ]
})
export class InternationalizationModule {}
