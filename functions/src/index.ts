/*
 * This template contains a HTTP function that responds
 * with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/publishers
 */

import * as functions from "firebase-functions";
import Mux from '@mux/mux-node';
const { Video } = new Mux(process.env.MUX_TOKEN_ID ?? "", process.env.MUX_TOKEN_SECRET ?? "");

exports.muxSignedUrl = functions.https.onRequest(
  (req: functions.Request, res: functions.Response) => {
    
    Video.Uploads.create({
      cors_origin: process.env.MUX_CORS_URL, 
      new_asset_settings: {
        playback_policy: 'public'
      }
    }).then(upload => {
      res.send(upload.url)
    });

  });
